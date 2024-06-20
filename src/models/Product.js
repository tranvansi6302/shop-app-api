const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/connect')
const Category = require('./Category')
const Brand = require('./Brand')

const Product = sequelize.define(
    'Product',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        sold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Brand,
                key: 'id'
            }
        }
    },
    {
        tableName: 'products'
    }
)

module.exports = Product
