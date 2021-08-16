const { userExist } = require('../services/UserExist.service');
const { registerUser } = require('../services/registerUser.service');
const { User } = require('../models/User');
const { createJWT } = require('../services/createJWT.service');
const { validateEmailPassword } = require('../services/validateEmailPassword.service');

/*
* En este Archivo Home Tenemos Controladores:
*Login, Register , RecuperarContraseña
TODO: Implementar  RecuperarContraseña
*/


//Controaldores

/*------Login Users -------- */
const loginGet = (req, res) => {
    res.render('login');
}
const loginPost = async(req, res) => {
    const { email, password } = req.body;
    //verificamos el correo exista 

    const user = await validateEmailPassword(email, password, req, res);
    if (user) {
        //console.log(user);
        const token = await createJWT(user.dataValues.id_unique, user.dataValues.email);
        const first_login = user.dataValues.first_login;
        await User.update({ last_connected: Date.now() }, { where: { email: user.dataValues.email } });

        if (first_login) {
            // user.update({ first_login }, { where: { email } });
            res.cookie('token', token).redirect('/app/welcome');
        } else {
            res.cookie('token', token).redirect('/app/home');
        }
    }

    //   return res.status(500).json("Problemas en el Servidor Intente mas tarde");
}

const getAuth = (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=0d2b7ff74ca4bce7ef38`)
}



/* ---------Register Users ------ */
const registerGet = (req, res) => {
        res.render('register');
    }
    //Registramos un usuario
const registerPost = async(req, res) => {
    const { first_name, last_name, email, password, user_name, date_birth } = req.body;
    //verificamos si el usuario ya esta registrado
    if (await userExist(email)) {
        //registramos al usuario
        await registerUser(first_name, last_name, email, password, user_name, date_birth, req, res);
        delete first_name;
        delete last_name;
        delete email;
        delete password;
        delete date_birth
    } else {
        res.status(403).json("Usuario ya registrado");
    }
}



const anyrequest = (req, res) => {
    res.render('404');
}


module.exports = {
    loginGet,
    registerGet,
    anyrequest,
    registerPost,
    loginPost,
    getAuth,
}