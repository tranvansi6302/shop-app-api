const jwt = require('jsonwebtoken')
const { env } = require('../configs/env')

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    try {
        const user = jwt.verify(token, env.JWT_SECRET)
        req.user = user
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }
    next()
}

module.exports = jwtAuthMiddleware
