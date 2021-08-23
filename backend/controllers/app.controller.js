const { User } = require("../models/User");
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { Comment } = require("../models/Comments");
const { Friendship } = require("../models/Friendship");
const { Chat } = require("../models/Chat");


//Home get mostramos todos los usuarios registrados
const homeGet = (req, res) => {
    res.render('home');
}

//Hacemos el render del perfil logeado
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
    let img = `https://teclanetwork.azurewebsites.net/app/image/${email}`;


    res.render('profile', {
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

//Un nuveo usuario le hacemos el render de welcome
const newUser = async(req, res) => {
    const token = req.cookies.token;
    const { email } = jwt.verify(token, "secretkey");
    const user = await User.findOne({ where: { email } });
    let firtname = user.dataValues.first_name;
    let lastname = user.dataValues.last_name;

    res.render('welcome', {
        firtname,
        lastname,
        email

    });
}

//Cuando un usuario se logea por primera vez hacemos que inserte sus datos
const welcomePost = async(req, res) => {
    const { about, hobbie, skill1, skill2, skill3, proffesion, phone_number, english_level, experience } = req.body;
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (user === null) {
        res.json("Algo raro paso :V");
    }
    try {
        user.update({ about, hobbie, skill1, skill2, skill3, proffesion, phone_number, english_level, experience }, { where: { email } });
        user.update({ first_login: false }, { where: { email } })
        res.json("ok");
    } catch (e) {

        res.json(e);
        console.log("Algo feo paso : ", e);
    }
}

//Nos rgeresa info de un usuario
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
        let img = `https://teclanetwork.azurewebsites.net/app/image/${email}`;
        let id = user.dataValues.user_id;




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
            img,
            id,
        });
    }
}

//Nos regresa info de un usuario pero solo la imagen y el id
const profileJsonGet = async(req, res) => {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (user === null) {
        res.status(400).json('Usuario no encontrado');
    } else {
        let username = user.dataValues.user_name;
        let firstname = user.dataValues.first_name;
        let lastname = user.dataValues.last_name;
        let email = user.dataValues.email;
        let profession = user.dataValues.proffesion;
        // let connection = user.dataValues.last_connected;
        let img = `https://teclanetwork.azurewebsites.net/app/image/${email}`;
        let id = user.dataValues.id_user;
        res.json({
            firstname,
            lastname,
            email,
            username,
            imagen: img,
            profession,
            id,
        })

    }
}


//Nos regresa todos los usuarios
const GetProfiles = async(req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (e) {
        res.status(400).json('Problema al solicitar tu peticion');
        console.log(e);
    }
}

//Nos regresa la imagen del usuario
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

//Agregamos un comenatrio a la base de datos
const PostComment = async(req, res) => {
    const { user_name, message, id_user } = req.body;
    console.log(user_name, message, id_user);
    try {
        const comment = await Comment.create({
            user_name,
            message,
            id_user,
        })
        res.json("Comentario actualizado");
    } catch (error) {
        res.json("Problema al insertar commentario");
    }


}

const GetComment = async(req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ where: { email } });
        const id = user.dataValues.id_user;
        const commets = await Comment.findAll({ where: { id_user: id } });

        if (user === null) {
            res.status(404).json("Recurso no encontrado");
        }
        if (commets == null) {
            res.status(404).json('Comentarios no econtrados');
        }
        res.status(200).json(commets);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Problemas en el servidor');
    }
}

//Creamos una amistad con una persona 
//Segun mi modelo de negocios en si creamos un seguimiento de personas igual que Twitter
const PostFriendship = async(req, res) => {
    const { email } = req.params;
    const { email_ori, email_des, id_user } = req.body;

    const exist = await Friendship.findOne({ where: { email_ori, id_user } });

    if (exist !== null) {
        return res.status(401).json("you were already a friend");
    } else {
        const frienship = await Friendship.create({
            email_ori,
            email_des: email,
            id_user
        });
        res.status(200).json("ok");
    }


}

const GetFriendsByEmail = async(req, res) => {
    const { email } = req.params;
    const friends = await Friendship.findAll({ where: { email_des: email } });
    if (friends !== null) {
        return res.status(200).json(friends);
    } else {
        return res.status(403).json("No tiene amigos");
    }
}


const GetChat = (req, res) => {
    res.render("chat");
}


const editProfileGet = (req, res) => {
    res.render('editProfile');
}

const historyChatGet = async(req, res) => {
    const chats = await Chat.findAll();
    res.json(chats);
}


module.exports = {
    homeGet,
    myprofileGet,
    newUser,
    welcomePost,
    profileGet,
    GetProfiles,
    GetImgProfile,
    PostComment,
    profileJsonGet,
    GetComment,
    PostFriendship,
    GetFriendsByEmail,
    GetChat,
    editProfileGet,
    historyChatGet
}