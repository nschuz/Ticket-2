const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');


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
    }
});



module.exports = {
    Comment
};