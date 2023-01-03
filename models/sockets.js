const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        // crear instancia de ticket list

        this.ticketList =  new TicketList()

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('cliente conectado')

            socket.on('new-ticket',(data,callback)=>{
                const newTicket = this.ticketList.createTicket()
                callback(newTicket)
            })

            socket.on('next-ticket-to-work',(usuario,callback)=>{
                const yourTicket = this.ticketList.assignTicket(usuario.agente,usuario.escritorio)
                callback(yourTicket)
                this.io.emit('assigned-ticket',this.ticketList.last13)
            })
        });
    }


}


module.exports = Sockets;