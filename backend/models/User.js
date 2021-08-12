const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');



const User = sequelize.define("user", {
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_unique: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_birth: {
        type: Sequelize.DATE,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },

});




module.exports = {
    User
};