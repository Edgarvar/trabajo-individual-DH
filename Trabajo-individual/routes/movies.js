var fs = require('fs');
var express = require('express');
var router = express.Router();
var db = require('../database/models');
var sequelize = db.sequelize;
var moviesController = require('../controllers/moviesController.js');


router.get('/', moviesController.list);

router.get('/detail/:id', moviesController.detail);

router.get('/create', moviesController.create);

router.post('/create', moviesController.store);

router.get('/edit/:id', moviesController.edit);

router.put('/edit/:id', moviesController.update);

router.delete('/delete/:id', moviesController.destroy);

router.get('/genero/:id', moviesController.moviesGenre);

router.get('/actors/:id', moviesController.actor);


module.exports = router;