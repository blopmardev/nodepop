'use strict';
const express = require('express');
const router = express.Router();
const Ad = require('../../models/Ad');

router.get('/', async (req, res, next) => {
    try {
        // Filtros
        const name = req.query.name;
        const price = req.query.price;
        const sale = req.query.sale;

        const tag = req.query.tag;
        const min = req.query.min;
        const max = req.query.max;

        // Paginar
        const skip = req.query.skip;
        const limit = req.query.limit;

        // Selección de campos
        const fields = req.query.fields;
        const sort = req.query.sort;

        let filter = {};
        if (name) {
            filter.name = RegExp("^"+name);;
        }
        if (price) {
            filter.price = price;
        }

        if (tag) {
            filter.tag = tag;
        }

        if (sale) {
            filter.sale = sale;
        }

        if (min && max){
            filter = {'$and': [{price: {'$gt': min}},{ price :{'$lt': max}}]};
        }
        if (min || max){
            if(min){
                filter.price = { $gt: min}}
                else{filter.price = { $lt: max}}
        }

        const ads = await Ad.list(filter, skip, limit, fields, sort, tag, sale, min, max)
        res.json({ results: ads });
        res.json(results.name)
    } catch (err) {
        next(err);
    }
})

router.get('/tags',async (req,res,next)=>{
    try{
    //lista de tag existente
    //obtener listado de tags
    const adList = await (Ad.list())
    const l_tag = []
    for (let i = 0; i < adList.length; i++) {
        for (let j = 0; j < (adList[i].tag).length; j++){
            if (!(l_tag.includes(adList[i].tag[j]))){
                l_tag.push(adList[i].tag[j])
            }
        }
    }
    res.json({l_tag});
    }catch(error){
        next(error)
    }})

//POST /apiv1/anuncios (body=adData)
//Crear un anuncio

router.post('/', async (req, res, next) => {
    try {
        const adData = req.body;
        const ad = new Ad(adData);

        const updatedAd = await ad.save();
        res.json({ result: updatedAd });
    } catch (err) {
        next(err);
    }
});

module.exports = router;