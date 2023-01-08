'use strict'
const mongoose = require('mongoose');

// Definir el Squema de los agentes
const agenteSchema = mongoose.Schema({
    //name: String
    name: {type: String, unique: true},
    //age: Number
    age: {type: Number, index: true, min: 18, max: 120}
})

// Añadir método estático

agenteSchema.statics.lista = function(filter, skip, limit, fields, sort){
    const query = Agente.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}
// Crear el modelo
const Agente = mongoose.model('Agente', agenteSchema);

//Exportar el modelo
module.exports = Agente;