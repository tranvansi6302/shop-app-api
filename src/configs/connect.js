const { Sequelize } = require('sequelize')
const { env } = require('./env')

const sequelize = new Sequelize(env.MYSQL_DATABASE, env.MYSQL_USER, env.MYSQL_PASSWORD, {
    logging: false,
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: env.SEQUELIZE_DIALECT
})
const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = { connectToDatabase, sequelize }
