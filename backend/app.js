//primero van las importaciiones nativas de node como requires , despues  la de terceros
require('dotenv').config()
//depues nuestras importaciones
const Server = require('./server')
//Instacimos nustro Server
const server = new Server();
//El server se pone a las escucha
server.listen();