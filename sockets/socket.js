const { io } = require('../index');

// Sockets
io.on('connection', (client) => {
    console.log('Client connected');

    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
});