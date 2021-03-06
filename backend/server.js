const express = require('express')
const cors = require('cors')
const colors = require('colors');
const path = require('path');
const sequelize = require("./db/conexion");
const { apiLimiter } = require('./middlewares/expressRateLimit')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User')
const SocketIO = require('socket.io');

require('dotenv').config({ path: "../dev.env" });
const hbs = require('hbs');
const { Comment } = require('./models/Comments');
const { Friendship } = require('./models/Friendship');
const { Chat } = require('./models/Chat');



//Nuestra clase server donde se ejecutan express , routas , middlewares y la conexion a la base de datos
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
            //aqui colocamos nuestros paths
        this.appPath = '/app'
        this.homePath = '/';

        this.app.set('views', path.join(__dirname, '/views'));
        console.log(path.join(__dirname, '/views'));
        this.app.set('view engine', 'hbs');
        //declaracion para usar partials
        hbs.registerPartials(path.join(__dirname, '/views/partials'), function(e) {})


        //Middlewares
        //Funaciones que añaden funcionalidad
        this.middlewares();

        //Conexicon DB
        this.connectDB();

        //Rutas de mi apliccion sd
        this.routes()

        this.socket();



    }


    middlewares() {

        //Cors
        this.app.use(cors())
            //Middleware Public
        this.app.use(express.static(path.join(__dirname, 'public')))
            //un middlware para recibir un json den el header - Lectura y parseo del body
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        //express-rate-limit
        this.app.use(apiLimiter)
        this.app.use(morgan('combined'))
            //CookieParser
        this.app.use(cookieParser());
    }

    async connectDB() {
        try {
            await sequelize.authenticate();
            console.log('Conexion con la base de datos establecida'.green);

            await Promise.all([User.sync(), Comment.sync(), Friendship.sync(), Chat.sync()]).then(() => {
                User.hasMany(Comment, { as: 'Comments', foreignKey: 'id_comment' });
                Comment.belongsTo(User, { foreignKey: 'id_user' });
                User.hasMany(Friendship, { foreignKey: 'id_friendship' });
                Friendship.belongsTo(User, { foreignKey: 'id_user' });
                //User.belongsTo(Friendship, { foreignKey: 'id_friendship' });

            }).catch(err => {
                console.log(err);
            })
            console.log("Todos los modelos fueron sincronizados correctamente".green);
        } catch (error) {
            console.error('Problema al conectrase o al sicronizar modelos'.red, error);
        }

    }

    //Est metodo van nuestras rutas
    routes() {
        this.app.use(this.homePath, require('./routes/home.routes'));
        this.app.use(this.appPath, require('./routes/app.routes'));
        this.app.use(function(req, res, next) {
            res.status(404).render('404');
        });
    }

    async socket(server) {
        const io = SocketIO(server);
        io.on('connection', function(socket) {
            console.log("new connection", socket.id);
            socket.on('chat:message', async(data) => {
                console.log("data: ", data);
                const { username, message, img } = data;
                const chat = await Chat.create({
                        name: username,
                        message,
                        img
                    })
                    //recibimos los datos y enviamos a todos data
                io.sockets.emit('chat:message', data)

            })
            socket.on('chat:typing', (data) => {
                socket.broadcast.emit('chat:typing', data);
            })

        })
    }

    //Este metodo es el listen escucha al puerto
    listen() {
        const server = this.app.listen(this.port || 8080, () => {
            console.log(`Server corriendo en ${this.port}`.green);
        })
        this.socket(server)
    }
}


module.exports = Server;