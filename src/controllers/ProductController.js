const Product = require('../models/Product')

class ProductController {
    async getAllProducts(req, res) {
        const products = await Product.findAll({
            include: ['category', 'brand', 'images', 'items']
        })
        return res.json({
            success: true,
            result: products,

            // Để sau
            pagination: {
                page: 1,
                limit: 1,
                total_page: 1
            }
        })
    }
    async getProductById(req, res) {
        const id = req.params.id
        const product = await Product.findByPk(id, {
            include: ['category', 'brand', 'images', 'items']
        })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        return res.json({
            success: true,
            result: product
        })
    }
}

const productController = new ProductController()
module.exports = productController
