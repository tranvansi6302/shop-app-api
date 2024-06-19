const { Router } = require('express')

const categoryController = require('../controllers/CategoryController')

const categoryRouter = Router()

categoryRouter.get('/', categoryController.getAllCategories)

module.exports = categoryRouter
