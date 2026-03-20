import { Server as httpServer } from 'http';

import express from 'express';

import { Server as socketServer } from 'socket.io';


const port = process.env.SOCKET_PORT || 3000;


const app = express();

const http = new httpServer(app);

const io = new socketServer(http);

io.on( "connection", ( socket ) => {

    socket.emit("connected");


})



http.listen( port, () => 
    console.log(`socket server listening at: http://localhost:${port}`) 
);

export default io;



