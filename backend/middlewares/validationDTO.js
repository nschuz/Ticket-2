const Joi = require('joi');
const { LoginDTO } = require('../dto/User/userLogin.dto');
const { UserDTO } = require('../dto/User/userRegister.dto');

module.exports.checkRegister = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, UserDTO, "Los datos enviados no son correctos")
        return next();
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
module.exports.checkLogin = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, LoginDTO, "Los datos enviados no son correctos")
        return next();
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}