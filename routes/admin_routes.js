'use strict';

var bodyparser = require('body-parser');
var adminAuth = require('../lib/admin_auth')(process.env.APP_SECRET);
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);
var createUserController = require('../controllers/create_user_controller');
var signInController = require('../controllers/sign_in_controller');
var allGenreController = require('../controllers/all_genre_controller');
var addRestController = require('../controllers/add_rest_controller');
var editRestController = require('../controllers/edit_rest_controller');
var deleteRestController = require('../controllers/delete_rest_controller');
var allRestFormController = require('../controllers/all_rest_form_controller');
var byIdRestFormController = require('../controllers/byid_rest_form_controller');

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/create_user', createUserController);
  router.get('/sign_in', passport.authenticate('basic', {session: false}), signInController);
  router.get('/restaurants', eatAuth, allRestFormController);
  router.get('/genres', eatAuth, allGenreController);
  router.post('/restaurants', eatAuth, addRestController);
  router.get('/restaurants/:id', eatAuth, byIdRestFormController);
  router.put('/restaurants/:id', eatAuth, editRestController);
  router.delete('/restaurants/:id', eatAuth, deleteRestController);
};
