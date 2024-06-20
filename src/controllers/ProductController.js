const { omit } = require('lodash')
const { sequelize } = require('../configs/connect')
const Product = require('../models/Product')
const ProductImage = require('../models/ProductImage')
const ProductItem = require('../models/ProductItem')

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

    async createProduct(req, res) {
        const t = await sequelize.transaction()
        try {
            const { name, price, description, sku, categoryId, brandId, colors, sizes } = req.body

            // Check brand and category
            const product = await Product.create({
                name,
                price,
                description,
                sku: sku.toUpperCase(),
                categoryId,
                brandId
            })

            for (let color of colors) {
                for (let size of sizes) {
                    await ProductItem.create({
                        productId: product.id,
                        color,
                        size,
                        price: price,
                        sku: `${sku.toUpperCase()}-${color.toUpperCase()}-${size.toUpperCase()}`
                    })
                }
            }
            await t.commit()

            return res.status(201).json({
                success: true,
                message: 'Product created successfully',
                result: product
            })
        } catch (error) {
            await t.rollback()
            return res.status(500).json({
                success: false,
                message: 'An error occurred while creating product',
                error: error.message
            })
        }
    }

    async uploadImage(req, res) {
        console.log('Upload, ', req.files)
        if (req.files) {
            const productId = req.params.id
            for (let file of req.files) {
                await ProductImage.create({
                    productId,
                    url: file.filename
                })
            }
        }
        res.json({
            success: true,
            message: 'Upload image successfully',
            result: req.files
        })
    }
}

const productController = new ProductController()
module.exports = productController
