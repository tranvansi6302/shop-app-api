const { where } = require('sequelize')
const { sequelize } = require('../configs/connect')
const Order = require('../models/Order')
const OrderDetail = require('../models/OrderDetail')
const Product = require('../models/Product')
const ProductImage = require('../models/ProductImage')
const ProductItem = require('../models/ProductItem')
const { generateRandomString } = require('../utils/random')

class OrderController {
    async createOrder(req, res) {
        const t = await sequelize.transaction()
        try {
            const { details } = req.body

            let order = await Order.findOne({
                where: {
                    userId: req.user.id,
                    isCart: true
                }
            })

            if (!order) {
                // If no existing cart, create a new order with isCart true
                order = await Order.create(
                    {
                        orderCode: generateRandomString(),
                        userId: req.user.id,
                        isCart: true
                    },
                    {
                        transaction: t
                    }
                )
            }

            // Add details to the order
            for (const detail of details) {
                const productItem = await ProductItem.findOne({
                    where: {
                        id: detail.productItemId
                    }
                })

                const orderDetail = await OrderDetail.findOne({
                    where: {
                        orderId: order.id,
                        productId: productItem.productId
                    }
                })

                if (orderDetail) {
                    return res.status(400).json({
                        success: false,
                        message: 'Đã tồn trong giỏ hàng'
                    })
                } else {
                    await OrderDetail.create(
                        {
                            orderId: order.id,
                            productItemId: detail.productItemId,
                            quantity: detail.quantity,
                            price: 0,
                            productId: productItem.productId
                        },
                        {
                            transaction: t
                        }
                    )
                }

                await t.commit()

                return res.json({
                    success: true,
                    message: 'Order updated successfully',
                    orderId: order.id // Optionally return the order ID
                })
            }
        } catch (error) {
            await t.rollback()
            return res.status(500).json({
                success: false,
                message: 'An error occurred while updating the order',
                error: error.message
            })
        }
    }

    async placeOrder(req, res) {
        const t = await sequelize.transaction()
        try {
            const { note, address, fullname, phone, confirm_orders } = req.body // Thêm orderDetails vào đây từ req.body

            let order = await Order.findOne({
                where: {
                    userId: req.user.id,
                    isCart: true
                }
            })

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'No cart found for the user'
                })
            }

            // Update the order with note, address, and set isCart to false
            order.note = note
            order.address = address
            order.fullname = fullname
            order.phone = phone
            order.isCart = false
            await order.save({ transaction: t })

            // Cập nhật lại số lượng của từng chi tiết đơn hàng
            for (const detail of confirm_orders) {
                await OrderDetail.update(
                    { quantity: detail.quantity, price: detail.price }, // Sử dụng quantity được gửi lên từ req.body
                    { where: { id: detail.order_detail_id } }, // Lọc theo orderDetailId
                    { transaction: t }
                )
            }

            await t.commit()

            return res.json({
                success: true,
                message: 'Order placed successfully',
                orderId: order.id // Optionally return the order ID
            })
        } catch (error) {
            await t.rollback()
            return res.status(500).json({
                success: false,
                message: 'An error occurred while placing the order',
                error: error.message
            })
        }
    }
    async updateOrderDetail(req, res) {
        const t = await sequelize.transaction()
        try {
            const { orderId, orderDetailId, quantity } = req.body

            // Kiểm tra orderId và orderDetailId có tồn tại và hợp lệ
            if (!orderId || !orderDetailId || !quantity) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing orderId, orderDetailId, or quantity in request body'
                })
            }

            // Kiểm tra xem đơn hàng có tồn tại không
            const order = await Order.findOne({
                where: {
                    id: orderId,
                    userId: req.user.id,
                    isCart: true
                }
            })

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'No cart found for the user'
                })
            }

            // Cập nhật số lượng của chi tiết đơn hàng
            const updatedOrderDetail = await OrderDetail.update(
                { quantity },
                {
                    where: {
                        id: orderDetailId,
                        orderId: order.id
                    },
                    returning: true,
                    transaction: t
                }
            )

            await t.commit()

            return res.json({
                success: true,
                message: 'Order detail updated successfully',
                updatedOrderDetail: updatedOrderDetail[1][0]
            })
        } catch (error) {
            await t.rollback()
            return res.status(500).json({
                success: false,
                message: 'An error occurred while updating order detail',
                error: error.message
            })
        }
    }
    async deleteOrderDetail(req, res) {
        const t = await sequelize.transaction()
        try {
            const { orderDetailId } = req.body
            console.log(req.body)

            // Tìm và xóa chi tiết đơn hàng từ cơ sở dữ liệu
            const deletedOrderDetail = await OrderDetail.destroy({
                where: {
                    id: orderDetailId
                },
                transaction: t
            })

            if (!deletedOrderDetail) {
                await t.rollback()
                return res.status(404).json({
                    success: false,
                    message: 'Order detail not found'
                })
            }

            await t.commit()

            return res.json({
                success: true,
                message: 'Order detail deleted successfully'
            })
        } catch (error) {
            await t.rollback()
            return res.status(500).json({
                success: false,
                message: 'An error occurred while deleting order detail',
                error: error.message
            })
        }
    }

    async getOrderIsCart(req, res) {
        try {
            const order = await Order.findOne({
                where: {
                    userId: req.user?.id,
                    isCart: true
                }
            })

            if (order) {
                const orderDetail = await OrderDetail.findAll({
                    where: {
                        orderId: order?.id
                    },
                    include: [
                        {
                            model: ProductItem,
                            as: 'product_items',
                            include: [
                                {
                                    model: Product,
                                    as: 'product',
                                    attributes: ['name'],

                                    include: [
                                        {
                                            model: ProductImage,
                                            as: 'images'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
                return res.json({
                    success: true,
                    result: orderDetail
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'An error occurred while fetching orders',
                error: error.message
            })
        }
    }
}

const orderController = new OrderController()
module.exports = orderController
