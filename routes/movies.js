const express = require('express');
const Movie = require('../models/movie');
const { response } = require('../app');
const baseRouter = new express.Router();

// - - - - - - - - - - - - - - - - - - - - > WEBSITE ROOT (GET REQUEST)
baseRouter.get('/', (req, res, next) => {
  Movie.find()
    .then(movieList => {
      res.render('movies/index', { movieList });
      console.log(movieList);
    })

    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - > MOVIE CREATION (GET REQUEST)
baseRouter.get('/create', (req, res, next) => {
  res.render('movies/create');
});

// - - - - - - - - - - - - - - - - - > MOVIE CREATION (POST REQUEST)
baseRouter.post('/create', (req, res, next) => {
  const data = req.body;

  Movie.create({
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then(movie => {
      console.log('Movie was created', movie);
      res.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - - > MOVIE DETAILS (GET REQUEST)
baseRouter.get('/show/:id', (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(movieDetail => {
      res.render('movies/show', { movieDetail: movieDetail });
    })

    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - > MOVIE DELETION (POST REQUEST)
baseRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })

    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = baseRouter;
