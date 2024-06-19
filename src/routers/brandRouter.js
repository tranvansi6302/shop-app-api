const { Router } = require('express')

const brandController = require('../controllers/BrandController')

const brandRouter = Router()

brandRouter.get('/', brandController.getAllBrands)

module.exports = brandRouter
