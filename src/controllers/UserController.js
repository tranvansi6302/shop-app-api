const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { env } = require('../configs/env')

class UserController {
    async register(req, res, next) {
        try {
            const { fullname, email, password } = req.body

            const existstedUser = await User.findOne({ where: { email } })
            if (existstedUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                })
            }

            const hashedPassword = bcrypt.hashSync(password)
            const user = await User.create({ fullName: fullname, email, password: hashedPassword })

            return res.json({
                success: true,
                message: 'Register successfully',
                result: user
            })
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ where: { email } })
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Email or password is incorrect'
                })
            }

            const isMatch = bcrypt.compareSync(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Email or password is incorrect'
                })
            }
            const token = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: '5d' })

            return res.json({
                success: true,
                message: 'Login successfully',
                result: {
                    user,
                    access_token: token
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

const userController = new UserController()
module.exports = userController
