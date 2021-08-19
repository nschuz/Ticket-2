const { User } = require("../models/User");
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const homeGet = (req, res) => {
    res.render('home');
}

const myprofileGet = async(req, res) => {

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
    let img = `http://localhost:8080/app/image/${email}`;


    res.render('myprofile', {
        img,
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
        img
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

const profileGet = async(req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ where: { user_name: username } });
    console.log(user);
    if (user === null) {
        res.status(400).json('Usuario no encontrado');
    } else {
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
        let email = user.dataValues.email;
        let connection = user.dataValues.last_connected;
        let img = `http://localhost:8080/app/image/${email}`;




        res.render('userProfile', {
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
            connection,
            img
        });
    }
}

const GetProfiles = async(req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (e) {
        res.status(400).json('Problema al solicitar tu peticion');
        console.log(e);
    }
}

const GetImgProfile = async(req, res) => {
    const { email } = req.params;
    try {
        //const filePath = path.join(__dirname, '../', 'images', email + '.png');
        const filePath = path.join(__dirname, '../', 'images');
        console.log(path.extname(filePath));
        console.log(email);
        let bandera = false;

        await fs.readdir(filePath, async(err, files) => {
            await files.forEach(file => {
                console.log("file", file);
                console.log(file.startsWith(email));
                if (file.startsWith(email)) {
                    bandera = true;
                    const img = path.join(filePath, file);
                    console.log("img:", img);
                    return res.sendFile(img);
                }
            });
            if (!bandera) {
                const imgagenDefault = path.join(filePath, 'default.jpg');
                return res.sendFile(imgagenDefault);
            }
        });


    } catch (error) {
        console.log(error);
        res.status(404).json("Problema")
    }










}



module.exports = {
    homeGet,
    myprofileGet,
    newUser,
    welcomePost,
    profileGet,
    GetProfiles,
    GetImgProfile,
}