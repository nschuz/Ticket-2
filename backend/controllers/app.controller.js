const { User } = require("../models/User");
const jwt = require('jsonwebtoken');

const homeGet = (req, res) => {
    res.render('home');
}

const profileGet = async(req, res) => {

    // const token2 = req.cookies.token;
    // const { uid } = jwt.verify(token2, 'secretkey')
    // const usuario = await Usuario.findOne({ where: { id_unico: uid } })
    // let nombre = usuario.dataValues.nombre;
    // nombre = nombre.toUpperCase();

    // res.render('admin', {
    //     nombre
    // });   
    const token = req.cookies.token;
    const { email } = jwt.verify(token, "secretkey");
    const user = await User.findOne({ where: { email } });
    let username = user.dataValues.user_name;
    let firtname = user.dataValues.first_name;
    let lastname = user.dataValues.last_name;
    let about = user.dataValues.about;
    let hobbies = user.dataValues.hobbie;
    let skill1 = user.dataValues.skill1;
    let skill2 = user.dataValues.skill2;
    let skill3 = user.dataValues.skill3;
    let profession = user.dataValues.proffesion;
    let phone = user.dataValues.phone_number;
    let english = user.dataValues.english_level;
    let experience = user.dataValues.experience;

    res.render('profile', {
        username,
        firtname,
        lastname,
        email,
        about,
        hobbies,
        skill1,
        skill2,
        skill3,
        profession,
        phone,
        english,
        experience,
    });
}

const newUser = (req, res) => {
    res.render('welcome');
}

const welcomePost = async(req, res) => {
    const { about, hobbie, skill1, skill2, skill3, proffesion, phone_number, english_level, experience } = req.body;
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (user === null) {
        res.json("Algo raro paso :V");
    }
    try {
        user.update({ about, hobbie, skill1, skill2, skill3, proffesion, phone_number, english_level, experience }, { where: { email } });
        console.log("Datos actualizados :)");
        res.json("ok");
    } catch (e) {

        res.json(e);
        console.log("Algo feo paso : ", e);
    }
}


module.exports = {
    homeGet,
    profileGet,
    newUser,
    welcomePost,
}