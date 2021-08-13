const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const {User}  = require("../models/User");

const registerUser= async (first_name, last_name, email, password, date_birth, req , res )=>{
    try {
        //ciframos la contraseña
        const passHas = await bcrypt.hash(password, 10);

        //Guardamos en la base de datos al usuario
        const user = await User.create({
            id_unique: uuidv4(),
            first_name,
            last_name,
            password: passHas,
            email,
            date_birth,
        })

        res.status(200).redirect('/login');
        //res.status(200).json("usuario creado")
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

module.exports ={
    registerUser
}