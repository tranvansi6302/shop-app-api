const Brand = require('./Brand')
const Category = require('./Category')
const Order = require('./Order')
const OrderDetail = require('./OrderDetail')
const Product = require('./Product')
const ProductImage = require('./ProductImage')
const ProductItem = require('./ProductItem')
const User = require('./User')

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
})
Category.hasMany(Product, {
    foreignKey: 'categoryId'
})

Product.belongsTo(Brand, {
    foreignKey: 'brandId',
    as: 'brand'
})

Brand.hasMany(Product, {
    foreignKey: 'brandId'
})

ProductImage.belongsTo(Product, {
    foreignKey: 'productId'
})

Product.hasMany(ProductImage, {
    foreignKey: 'productId',
    as: 'images'
})

ProductItem.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
})

Product.hasMany(ProductItem, {
    foreignKey: 'productId',
    as: 'items'
})

User.hasMany(Order, {
    foreignKey: 'userId'
})

Order.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})

Order.hasMany(OrderDetail, {
    foreignKey: 'orderId',
    as: 'details'
})

OrderDetail.belongsTo(Order, {
    foreignKey: 'orderId'
})

OrderDetail.belongsTo(ProductItem, {
    foreignKey: 'productItemId',
    as: 'product_items'
})

ProductItem.hasMany(OrderDetail, {
    foreignKey: 'productItemId'
})
