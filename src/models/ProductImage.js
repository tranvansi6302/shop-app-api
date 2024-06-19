const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/connect')
const Product = require('./Product')

const ProductImage = sequelize.define(
    'ProductImage',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id'
            }
        }
    },
    {
        tableName: 'product_images'
    }
)

module.exports = ProductImage
