const { Router } = require('express')
const productController = require('../controllers/ProductController')
const uploadMiddleware = require('../middlewares/upload')

const productRouter = Router()

productRouter.get('/', productController.getAllProducts)
productRouter.get('/:id', productController.getProductById)
productRouter.post('/', productController.createProduct)
productRouter.patch('/:id/uploads', uploadMiddleware.array('files'), productController.uploadImage)

// /products/ -> GET POST PUT DELETE
module.exports = productRouter
