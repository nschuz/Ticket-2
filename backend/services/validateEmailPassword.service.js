const { User } = require("../models/User");
const bcrypt = require('bcrypt');

const validateEmailPassword = async(email, password, req, res) => {
    try {
        const user = await User.findOne({ where: { email } });
        console.log("USUARIO: ", user);

        if (user == null) {
            res.status(400).json('Usuario/Password erroneos')
        }

        //verificamos el password sea correcto 
        //validar password 
        const passwordDB = user.dataValues.password;
        const passwordCorecto = bcrypt.compareSync(password, passwordDB);
        console.log("password ", passwordCorecto);
        if (!passwordCorecto) {
            res.status(400).json('Usuario/Password erroneos')
        }

        if ((user !== null) && passwordCorecto) {
            return user;
        } else {
            return false;
        }


    } catch (e) {
        res.status(500).json("Problemas en el servidor intente mas tarde")
        console.log(e);
    }

}

module.exports = {
    validateEmailPassword
}