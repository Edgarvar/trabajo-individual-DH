var db = require('../database/models');

let moviesController = {
    list: function(req, res, next){
        db.Movie.findAll()
        .then(function(peliculas){
            res.render('movies/allMovies', {peliculas: peliculas});
        })
    },
    detail: function(req, res, next){
        db.Movie.findByPk(req.params.id, {
            include: [{association: "genero"}, {association: "actores"}]
        })
        .then(function(pelicula){
            res.render('movies/detail', {pelicula: pelicula})
        });
    },
    create: function(req, res, next){
        res.render('movies/createForm');
    },
    store: function(req, res, next){
        db.Movie.create(req.body)
            .then(movie => {
                console.log("SE CARGO UNA NUEVA PELICULA.")
                console.log(movie)
            })
            .catch(error => {
                console.log(error)
            })

        res.redirect('/movies');

    },
    edit: function(req, res, next) {
        
        db.Movie.findByPk(req.params.id, {
            include: [{association: "genero"}]
        })
        .then(function(movie){
            res.render('movies/editForm', {movie: movie});
        })
        .catch(error => {
            console.log(error);
        });
    },
    update: function(req, res, next){
        db.Movie.update({
            title: req.body.title,
            length: req.body.length,
            genre_id: req.body.genre_id,
            awards: req.body.awards,
            rating: req.body.rating,
            release_date: req.body.release_date
        },{
            where: {
                id: req.params.id
            }
        })
        .then(movie => {
            res.redirect('/movies');
        })
        .catch(error => {
            console.log(error);
        })
    },
    destroy: function(req, res, next) {
        db.Movie.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(data => {
            res.redirect('/movies')
        })
    },
    moviesGenre: function(req, res, next) {
        let genero = db.Genero.findByPk(req.params.id)
        db.Movie.findAll({
         where: {
             genre_id: req.params.id
         }
        },{
            include: [{association: "genero"}]
        })
        .then(function(peliculas){
            console.log(genero)
           res.render("movies/moviesGenre", {peliculas: peliculas, genero: genero})
        })
    },
    actor: function(req, res ,next) {
        db.Actor.findByPk(req.params.id, {
            include: [{association: "movies"}]
        })
        .then(function(actor){
            res.render('movies/actorDetail', {actor: actor})
        });
    }
}

module.exports = moviesController;