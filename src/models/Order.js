const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/connect')
const User = require('./User')

const Order = sequelize.define(
    'Order',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        },
        isCart: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        note: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: 'orders'
    }
)

module.exports = Order
