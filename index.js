const express = require('express');
const path = require('path');
require('dotenv').config();

// Database
require('./database/config').dbConnection();

// App Express
const app = express();

// Body Parser
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')

//Path public
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

// Routes
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, ( err ) => {
    if (err) throw new Error(err);
    console.log('Server is running on port', process.env.PORT);
});