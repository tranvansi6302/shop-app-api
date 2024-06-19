const Category = require('../models/Category')

class CategoryController {
    async getAllCategories(req, res) {
        const categories = await Category.findAll()
        return res.json({
            success: true,
            result: categories,

            // Để sau
            pagination: {
                page: 1,
                limit: 1,
                total_page: 1
            }
        })
    }
}

const categoryController = new CategoryController()
module.exports = categoryController
