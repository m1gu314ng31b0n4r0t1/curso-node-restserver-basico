require('dotenv').config();

const Server = require('./models/server');

/*
const express = require('express');
const app = express()
const port = process.env.PORT;

*/

const server = new Server();

server.listen();


/*
app.get('/', function (req, res) {
  res.send('Hello World')
})

*/
 