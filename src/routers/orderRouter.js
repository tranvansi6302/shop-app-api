const { Router } = require('express')

const orderController = require('../controllers/OrderController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')

const orderRouter = Router()

orderRouter.post('/carts', jwtAuthMiddleware, orderController.createOrder)
orderRouter.post('/confirm', jwtAuthMiddleware, orderController.placeOrder)
orderRouter.get('/carts', jwtAuthMiddleware, orderController.getOrderIsCart)
orderRouter.post('/update-quantity', jwtAuthMiddleware, orderController.updateOrderDetail)
orderRouter.delete('/carts', jwtAuthMiddleware, orderController.deleteOrderDetail)

module.exports = orderRouter
