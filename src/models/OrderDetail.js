const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/connect')
const Order = require('./Order')
const ProductItem = require('./ProductItem')

const OrderDetail = sequelize.define(
    'OrderDetail',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Order,
                key: 'id'
            }
        },
        productItemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductItem,
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    },
    {
        tableName: 'order_details'
    }
)

module.exports = OrderDetail
