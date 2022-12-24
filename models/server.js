const cors = require('cors')
const express = require('express');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server); 

        this.port = process.env.PORT || 8080

        //Middlewares
        this.middlewares();

        //Sockets
        this.sockets();
    }

    middlewares() {
        
        //cors
        this.app.use(cors())

        //directorio publico
        this.app.use(express.static('public'))
    }

    sockets() {

        this.io.on('connection', socketController);

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}

module.exports = Server;