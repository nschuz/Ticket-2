const { userExist } = require('../services/UserExist.service');
const { registerUser } = require('../services/registerUser.service');
const { User } = require('../models/User');
const { createJWT } = require('../services/createJWT.service');
const { validateEmailPassword } = require('../services/validateEmailPassword.service');


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
        const token = await createJWT(user.dataValues.id_unique);
        res.cookie('token', token).redirect('/app/home');
    }

    //   return res.status(500).json("Problemas en el Servidor Intente mas tarde");


}



/* ---------Register Users ------ */
const registerGet = (req, res) => {
        res.render('register');
    }
    //Registramos un usuario
const registerPost = async(req, res) => {
    const { first_name, last_name, email, password, date_birth } = req.body;
    //verificamos si el usuario ya esta registrado
    if (await userExist(email)) {
        //registramos al usuario
        await registerUser(first_name, last_name, email, password, date_birth, req, res);
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
}