const User = require('mongoose').model('User');
const Notification = require('mongoose').model('Notification');

module.exports = (server) => {
    let io = require('socket.io')(server);

    io.on('connection', async (socket)=>{
        socket.on('disconnect', ()=>{
            console.log(`Deleting socket: ${socket.id}`);
        })
    });

    return io;
};
