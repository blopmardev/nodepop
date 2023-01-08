'use strict'

const TAGS_LIST = ["work", "lifestyle", "motor", "mobile"];

const mongoose = require('mongoose');
const adSchema = mongoose.Schema({
    name: {type: String, unique: true},
    on_sale: {type: Boolean, index: true},
    price: {type: Number, index: true, min: 0},
    image: {type: String},
    tags: [{type: String, enum: TAGS_LIST}]
})

// Añadir método estático

adSchema.statics.list = function(filtro, skip, limit, fields, sort){
    const query = Ad.find(filtro);
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