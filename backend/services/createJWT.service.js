const jwt = require('jsonwebtoken')
require('dotenv').config()


const createJWT = (uid = '', email = '') => {
    return new Promise((resolve, reject) => {
        //verificar solo el uid
        const payload = { uid, email };
        jwt.sign(payload, 'secretkey', {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }

        })
    })
}

/* 
* Interensante 
? Probando 
! depreted
Todo : implemtes 
*/


module.exports = {
    createJWT
}