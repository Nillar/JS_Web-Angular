const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
require('./config/database')(config);
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);
require('./config/passport/passport')();
require('dotenv').config();

const http = require('http').createServer(app);
const io = require('./config/socketio/socketio')(http);

process.on('uncaughtException', function(err) {
    console.log(err);
});

http.listen(config.port);

module.exports = io;