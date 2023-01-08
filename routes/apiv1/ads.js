'use strict';
const express = require('express');
const router = express.Router();
const Ad = require('../../models/Ad');

router.get('/', async (req, res, next) =>{
  try{
      // Filtros
      const name = req.query.name;
      const price = req.query.price;
      const tag = req.query.tag;

      // Paginar
      const skip = req.query.skip;
      const limit = req.query.limit;

      // Selección de campos
      const fields = req.query.fields;
      const sort = req.query.sort;

      const filter = {};
      if (name) {
          filter.name = name;
      }
      if (price) {
          filter.price = price;
      }
      if(tag){
        filter.tag = tag;
      }

      const ads = await Ad.list(filter, skip, limit, fields, sort, tag)
      res.json({results: ads});
      res.json(results.name)
  } catch(err){
      next(err);
  }
})

//POST /apiv1/anuncios (body=adData)
//Crear un anuncio

router.post('/', async (req, res, next) => {
  try {
      const adData = req.body;
      const ad = new Ad(adData);
      
      const updatedAd = await ad.save();
      res.json({result: updatedAd});
  } catch (err) {
      next(err);
  }
});

module.exports = router;
