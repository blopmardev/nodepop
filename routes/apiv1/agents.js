'use strict';
const express = require('express');
const router = express.Router();
const Agente = require('../../models/Agente');

router.get('/', async (req, res, next) =>{
    try{
        // Filtros
        const nombre = req.query.name;
        const edad = req.query.age;

        // Paginar
        const skip = req.query.skip;
        const limit = req.query.limit;

        // Selección de campos
        const fields = req.query.fields; // /api/agentes?fields=name%20-_id
        const sort = req.query.sort; // /api/agentes?sort=age%20-_id


        const filtro = {};
        // /api/agentes/?name=Jones
        if (nombre) {
            filtro.name = nombre;
        }
        
        // /api/agentes/?age=35
        if (edad) {
            filtro.age = edad;
        }

        const agentes = await Agente.lista(filtro, skip, limit, fields, sort)
        res.json({results: agentes});
        res.json(results.name)
    } catch(err){
        next(err);
    }
})

//GET /api/agentes/(id)
//Devuelve un agente

router.get('/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
        // Buscar un agente en la BBDD
        const agente = await Agente.findById(id);
        res.json({result: agente});

    } catch (err){
        next(err);
    }
})

//PUT /api/agentes/(id) (body=agenteData)
//Actualizar un agente
router.put('/:id', async(req, res, next) =>{
    try {
        const id = req.params.id;
        const agenteData = req.body;
        const agenteActualizado = await Agente.findOneAndUpdate({_id: id}, agenteData, {new: true});
        res.json({result: agenteActualizado})
    } catch (err) {
        next(err);
    }
});

//POST /api/agentes (body=agenteData)
//Crear un agente

router.post('/', async (req, res, next) => {
    try {
        const agenteData = req.body;
        // Instanciar un nuevo agente en memoria
        const agente = new Agente(agenteData);

        // Guardar en la BBDD
        const agenteGuardado = await agente.save();
        res.json({result: agenteGuardado});
    } catch (err) {
        next(err);
    }
});

//DELETE /api/agentes/:id
//Eliminar un agente

router.delete('/:id', async (req, res, next) =>{
    try {
       const id = req.params.id;
       await Agente.delete({_id: id});
       res.json({result: "element deleted"});

    } catch (err) {
        next(err)
    }
})
module.exports = router;