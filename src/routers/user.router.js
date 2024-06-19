const { Router } = require('express')

const userController = require('../controllers/UserController')

const userRouter = Router()

userRouter.post('/auth/register', userController.register)
userRouter.post('/auth/login', userController.login)

module.exports = userRouter
