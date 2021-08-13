const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { Usuario } = require('../models/Usuario');

const validarJWT = async(req = request, res = response, next) => {
    //leer los header
    const token = req.cookies.token;
    //const token = req.header('acces-token');
    console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, 'secretkey')
            //ller el usuario que corresponda al uid
        const usuario = await User.findOne({ where: { id_unico: uid } })
        req.usuario = usuario;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no valido'
        })

    }
}


module.exports = {
    validarJWT
}