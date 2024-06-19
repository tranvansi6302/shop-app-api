const { Router } = require('express')
const productController = require('../controllers/ProductController')

const productRouter = Router()

productRouter.get('/', productController.getAllProducts)
productRouter.get('/:id', productController.getProductById)

module.exports = productRouter
