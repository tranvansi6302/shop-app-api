const { Router } = require('express')

const orderController = require('../controllers/OrderController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')

const orderRouter = Router()

orderRouter.post('/', jwtAuthMiddleware, orderController.createOrder)

module.exports = orderRouter
