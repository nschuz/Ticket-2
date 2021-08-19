const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');
const { User } = require('./User');


const Comment = sequelize.define("comment", {

    id_comment: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    message: {
        type: Sequelize.STRING,
        allowNull: true
    },

    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            // Modelo de referencia
            model: User,
            // Nombre de la columna de referencia
            key: 'id_user',
        }
    }



});



module.exports = {
    Comment
};