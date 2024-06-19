'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('orders', 'fullname', {
            type: DataTypes.STRING,
            allowNull: false
        })
        await queryInterface.addColumn('orders', 'phone', {
            type: DataTypes.STRING,
            allowNull: false
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('orders', 'fullname')
        await queryInterface.removeColumn('orders', 'phone')
    }
}
