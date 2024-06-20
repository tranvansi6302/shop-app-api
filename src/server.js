const express = require('express')
const { connectToDatabase } = require('./configs/connect')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const productRouter = require('./routers/productRouter')
const errorMiddleware = require('./middlewares/errorMiddleware')
const categoryRouter = require('./routers/categoryRouter')
const brandRouter = require('./routers/brandRouter')
const userRouter = require('./routers/user.router')
const orderRouter = require('./routers/orderRouter')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const uploadDirectory = path.join(__dirname, 'uploads')
app.use('/uploads', express.static(uploadDirectory))

// Database config
require('./models/relationship')
connectToDatabase()

// Router
app.use('/api/v1/products', productRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/brands', brandRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1/orders', orderRouter)

// Handle error
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
