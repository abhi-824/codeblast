'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const studentRoutes = require('./routes/student-routes');

const app = express();

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

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
