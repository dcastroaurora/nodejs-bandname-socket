const {io} = require('../index');

io.on('connection',client=>{
    console.log('Cliente Conectado');

    client.on('disconnect',()=>{
        console.log('Cliente Desconectado');
    });

    client.on('message',(payload)=>{
        console.log('message!!!',payload);

        io.emit('message',{admin:'Nuevo Mensaje'});
    });
});