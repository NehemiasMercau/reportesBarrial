const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.SERVER,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            instanceName: "MSSQLSERVER",
            encrypt: false,
        },
    }
});


module.exports = sequelize;