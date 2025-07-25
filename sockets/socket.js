const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Guns N Roses'));

// Sockets
io.on('connection', (client) => {
    console.log('Client connected');
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
    client.on('message', (payload) => {
        console.log('Message received:', payload);
        io.emit('message', { admin: 'New message received' });
    });
    client.on('emit_message', (payload) => {
        console.log('New message received:', payload);
        client.broadcast.emit('reemit_message', payload);
    });
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});