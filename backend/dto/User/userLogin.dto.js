const Joi = require("joi");

module.exports.UsuarioDTO = Joi.object().keys({
    nombre: Joi.string().min(1).max(50),
    apellido: Joi.string().min(1).max(50).required(),
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required()
})

module.exports.LoginDTO = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required()
})