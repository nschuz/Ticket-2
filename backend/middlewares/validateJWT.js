const jwt = require('jsonwebtoken');
const { User } = require('../models/User');


const validateJWT = async(req = request, res = response, next) => {
    //leer los header
    const token = req.cookies.token;
    //const token = req.header('acces-token');


    if (!token) {
        return res.status(401).json({
            msg: 'You Must Login'
        })
    }

    try {
        const { email } = jwt.verify(token, 'secretkey')
        console.log("Email: " + email);
        //ller el usuario que corresponda al uid
        const usuario = await User.findOne({ where: { email } })
            // req.usuario = usuario;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'This Token Is Not Valid'
        })

    }
}


module.exports = {
    validateJWT
}