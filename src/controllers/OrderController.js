const { sequelize } = require('../configs/connect')
const Order = require('../models/Order')
const OrderDetail = require('../models/OrderDetail')
const { generateRandomString } = require('../utils/random')

class OrderController {
    async createOrder(req, res) {
        const t = await sequelize.transaction()
        const { note, address, details } = req.body
        const order = await Order.create(
            {
                orderCode: generateRandomString(),
                note,
                address,
                userId: req.user.id
            },
            {
                transaction: t
            }
        )
        for (const detail of details) {
            await OrderDetail.create(
                {
                    orderId: order.id,
                    productItemId: detail.productItemId,
                    quantity: detail.quantity,
                    price: detail.price
                },
                {
                    transaction: t
                }
            )
        }
        await t.commit()
        const orderFinal = await Order.findByPk(order.id, {
            include: [
                {
                    model: OrderDetail,
                    as: 'details'
                }
            ]
        })
        return res.json({
            success: true,
            message: 'Order created successfully',
            result: orderFinal
        })
    }
}
const orderController = new OrderController()
module.exports = orderController
