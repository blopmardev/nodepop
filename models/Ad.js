'use strict'
const TAGS_LIST = ["work", "lifestyle", "motor", "mobile"];

const mongoose = require('mongoose');
const adSchema = mongoose.Schema({
    name: {type: String, unique: true},
    sale: {type: Boolean, index: true},
    price: {type: Number, index: true, min: 0},
    image: {type: String},
    tag: [{type: Array, enum: TAGS_LIST}]
})

// Añadir métodos estáticos

adSchema.statics.list = function(filter, skip, limit, fields, sort){
    const query = Ad.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}
// Crear el modelo
const Ad = mongoose.model('Ad', adSchema);

//Exportar el modelo
module.exports = Ad;