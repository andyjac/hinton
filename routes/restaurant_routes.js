'use strict';

var Rest = require('../models/Restaurant');
var bodyparser = require('body-parser');

module.exports = function (router) {
  router.use(bodyparser.json());

  router.get('/restaurant/all', function (req, res) {
    Rest.find({}, 'map', function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json(data);
    });
  });

  router.get('/restaurant/genre/all', function(req, res) {
    Rest.find().distinct('restaurant.genre', function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json(data);
    });
  });

  router.get('/restaurant/:id', function (req, res) {
    Rest.findOne({'_id': req.params.id}, 'restaurant', function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json(data);
    });
  });

  router.get('/restaurant/genre/:genre', function(req, res) {
    Rest.find({'restaurant.genre': req.params.genre}, 'map', function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json(data);
    });
  });
};
