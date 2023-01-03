// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors')

const Sockets  = require('./sockets');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );

        // inicializacion de sockets
        this.sockets = new Sockets( this.io );
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        // configurar cors
        this.app.use( cors())

        //endpoint
        this.app.get('/last',(req,res)=>{
            res.json({
                ok:true,
                last: this.sockets.ticketList.last13
            })
        })
    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    // configurarSockets() {
    //     new Sockets( this.io );
    // }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        // this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;