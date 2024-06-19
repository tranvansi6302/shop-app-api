require('dotenv').config()
exports.env = {
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: process.env.MYSQL_PORT,
    SEQUELIZE_DIALECT: process.env.MYSQL_SEQUELIZE_DIALECT,
    JWT_SECRET: process.env.JWT_SECRET
}
