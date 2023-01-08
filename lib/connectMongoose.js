'use strict';

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err =>{
    console.log("Error de conexión a la Base de Datos MongoDB", err);
    process.exit(1);
});

mongoose.connection.once('open', () =>{
    console.log("Conectado a la BBDD MongoDB", mongoose.connection.name);
});

mongoose.connect('mongodb://127.0.0.1/nodepop');

module.exports = mongoose.connection;