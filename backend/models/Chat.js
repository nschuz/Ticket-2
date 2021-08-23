const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');;


const Chat = sequelize.define("chat", {

    id_chat: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    message: {
        type: Sequelize.STRING,
        allowNull: true
    },
    img: {
        type: Sequelize.STRING,
        allowNull: true
    },

});



module.exports = {
    Chat
};