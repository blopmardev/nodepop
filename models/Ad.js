'use strict'
const mongoose = require('mongoose');
const adSchema = mongoose.Schema({
    name: {type: String, unique: true},
    on_sale: {type: Boolean, index: true},
    price: {type: Number, index: true, min: 0},
    image: {type: String},
    tags: {type: String, index: true},
})

// Añadir método estático

adSchema.statics.lista = function(filtro, skip, limit, fields, sort){
    const query = Agente.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}
// Crear el modelo
const Agente = mongoose.model('Agente', adSchema);

//Exportar el modelo
module.exports = Agente;