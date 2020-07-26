const express = require('express');
const Celebrity = require('../models/celebrity');
const { response } = require('../app');
const baseRouter = new express.Router();

// - - - - - - - - - - - - - - - - - - - - > WEBSITE ROOT (GET REQUEST)
baseRouter.get('/', (req, res, next) => {
  Celebrity.find()
    .then(celebrityList => {
      res.render('celebrities/index', { celebrityList });
      console.log(celebrityList);
    })

    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - > CELEBRITY CREATION (GET REQUEST)
baseRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

// - - - - - - - - - - - - - - - - - > CELEBRITY CREATION (POST REQUEST)
baseRouter.post('/create', (req, res, next) => {
  const data = req.body;

  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(celebrity => {
      console.log('Celebrity was created', celebrity);
      res.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - - > CELEBRITY DETAILS (GET REQUEST)
baseRouter.get('/show/:id', (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then(celebrityDetail => {
      res.render('celebrities/show', { celebrityDetail: celebrityDetail });
    })

    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - > CELEBRITY EDIT (GET REQUEST)
baseRouter.get('/show/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then(celebrityDetail => {
      res.render('celebrities/edit', { celebrityDetail: celebrityDetail });
    })

    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - > CELEBRITY EDIT (POST REQUEST)
baseRouter.post('/show/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  Celebrity.findByIdAndUpdate(id, {
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - > CELEBRITY DELETION (POST REQUEST)
baseRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })

    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = baseRouter;
