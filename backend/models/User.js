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
    user_name: {
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

    about: {
        type: Sequelize.STRING,
        allowNull: true
    },
    hobbie: {
        type: Sequelize.STRING,
        allowNull: true
    },
    skill1: {
        type: Sequelize.STRING,
        allowNull: true
    },
    skill2: {
        type: Sequelize.STRING,
        allowNull: true
    },

    skill3: {
        type: Sequelize.STRING,
        allowNull: true
    },
    proffesion: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: true
    },
    english_level: {
        type: Sequelize.STRING,
        allowNull: true
    },
    experience: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_photo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    first_login: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    last_connected: {
        type: Sequelize.DATE,
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },


});




module.exports = {
    User
};