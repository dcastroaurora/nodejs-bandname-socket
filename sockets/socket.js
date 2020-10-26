const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Ricky Martin'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Metallica'));

io.on('connection',client=>{
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect',()=>{
        console.log('Cliente Desconectado');
    });

    // client.on('message',(payload)=>{
    //     // console.log('message!!!',payload);

    //     io.emit('message',{admin:'Nuevo Mensaje'});
    // });

    client.on('vote-band',function (band) {
        bands.voteBand(band.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band',function (band) {
        bands.addBand(new Band(band.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band',function (band) {
        bands.deleteBand(band.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('emitir-mensaje', (payload)=>{
         //io.emit('nuevo-mensaje',payload); //emite a todos!
         client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos al cliente que orgino el mensaje
    });
});