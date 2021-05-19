'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const studentRoutes = require('./routes/student-routes');
const socketio = require("socket.io");
const http = require("http");
const app = express(); 
const server = http.createServer(app);
const io = socketio(server);
io.on("connection", (socket) => {
    console.log("hey")
    socket.on("joinRoom", ({ username, room }) => {
        console.log(username, room)
      });
})

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', studentRoutes.routes);

if(process.env.NODE_ENV == 'production')
{
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req, res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

server.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
