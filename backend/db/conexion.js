const Sequelize = require("sequelize");
require('dotenv').config({ path: '../dev.env' })

let sequelize;
try {
    sequelize = new Sequelize('RedSocialTecla', 'teclaadmin', 'root123$', {
        //host: process.env.HOST,
        host: 'tecla.database.windows.net',
        dialect: 'mssql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000

        },
        dialectOptions: {
            encrypt: true
        }
    });
    console.log("Conexion a la base de datos correcta".green);
} catch (e) {
    console.log("Problema en la conexion ".red + e);
}
module.exports = sequelize;