const Joi = require("joi");
module.exports.UserDTO = Joi.object().keys({
    first_name: Joi.string().min(1).max(50),
    last_name: Joi.string().min(1).max(50),
    user_name: Joi.string().min(1).max(50).required(),
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
    date_birth: Joi.date(),
})