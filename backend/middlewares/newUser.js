const jwt = require('jsonwebtoken');
const { User } = require("../models/User");

const isNewUser = async(req, res, next) => {

    //leer los header
    const token = req.cookies.token;
    //const token = req.header('acces-token');
    console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: 'You must be logged in'
        });
    }

    try {
        const { email } = jwt.verify(token, 'secretkey')
        console.log(email);
        const user = await User.findOne({ where: { email } })
        const newUser = user.dataValues.first_login;

        if (newUser) {
            return res.status(401).json({ message: "Please You Must Finish your data profile " });
        }

        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'This Token Is Not Valid'
        })

    }


}

module.exports = {
    isNewUser
}