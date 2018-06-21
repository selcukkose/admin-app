const hapi = require('hapi');
const Mongoose = require('mongoose');
const Users = require('./models/user');


Mongoose.connect('mongodb://localhost/admin');
const db = Mongoose.connection;
db.on('error', (err)=>{
    console.log(err);
});
db.on('open', ()=>{
    console.log("connected to MongoDB");
});
  
const server = new hapi.server({
    port: 8000,
    host: 'localhost'
});


const start = async ()=>{

    await server.register(require('vision'));
    await server.register(require('./plugins/router'));
    await server.register(require('./plugins/login'));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'views'
    });

    await server.start();
    console.log("server running...");
}

process.on('unhandledRejection', (err)=>{

    console.log(err);
    process.exit(1);
})

start();