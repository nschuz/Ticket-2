const { User } = require('../models/User');
const userExist = async(email) => {
    const user = await User.findOne({ where: { email } });
    let existe = "";
    user == undefined ? existe = true : existe = false;
    console.log(existe);
    return existe;
}
module.exports = {
    userExist,
}