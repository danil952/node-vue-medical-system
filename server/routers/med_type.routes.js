const Router = require('express').Router;
const medtypeRep = require('../repositories/medtypeRep')

const medtypeRouter = Router();
medtypeRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await medtypeRep.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const med_type = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                type_id: req.body.type_id,
            };
            res.send(await medtypeRep.post(med_type));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
medtypeRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await medtypeRep.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const med_type = {
                name: req.body.name,
                price: req.body.price,
                descriprion: req.body.descriprion,
                type_id: req.body.type_id,
            };
            res.send(await medtypeRep.put(id, med_type));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await medtypeRep.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = medtypeRouter;