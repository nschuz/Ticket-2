const Joi = require("joi");


module.exports.LoginDTO = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required()
})