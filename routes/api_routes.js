'use strict';

var bodyparser = require('body-parser');
var allRestController = require('../controllers/all_rest_controller');
var allGenreController = require('../controllers/all_genre_controller');
var byIdRestController = require('../controllers/byid_rest_controller');
var byGenreRestController = require('../controllers/bygenre_rest_controller');

module.exports = function (router) {
  router.use(bodyparser.json());

  router.get('/restaurant/all', allRestController);
  router.get('/restaurant/genre/all', allGenreController);
  router.get('/restaurant/:id', byIdRestController);
  router.get('/restaurant/genre/:genre', byGenreRestController);
};
