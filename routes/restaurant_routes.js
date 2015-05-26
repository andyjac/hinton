'use strict';

var bodyparser = require('body-parser');
var allRestController = require('../controllers/all_rest_controller');
var allGenreController = require('../controllers/all_genre_controller');
var restByIdController = require('../controllers/rest_byid_controller');
var restByGenreController = require('../controllers/rest_bygenre_controller');

module.exports = function (router) {
  router.use(bodyparser.json());

  router.get('/restaurant/all', allRestController);
  router.get('/restaurant/genre/all', allGenreController);
  router.get('/restaurant/:id', restByIdController);
  router.get('/restaurant/genre/:genre', restByGenreController);
};
