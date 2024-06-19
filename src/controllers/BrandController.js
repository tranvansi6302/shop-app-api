const Brand = require('../models/Brand')

class BrandController {
    async getAllBrands(req, res) {
        const brands = await Brand.findAll()
        return res.json({
            success: true,
            result: brands,

            // Để sau
            pagination: {
                page: 1,
                limit: 1,
                total_page: 1
            }
        })
    }
}

const brandController = new BrandController()
module.exports = brandController
