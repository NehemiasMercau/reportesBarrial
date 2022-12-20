require('dotenv').config();

module.exports = {
    config: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        server: process.env.SERVER,
        options: {
            encrypt: false
        },
    }
};