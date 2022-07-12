require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Conectar DB
        this.conectarDB();

        // middlewares
        this.middlewares();

        // rutas de mi aplicaion
        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('./public'),)
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en: ', this.port)
        });
    }

};


module.exports = Server;