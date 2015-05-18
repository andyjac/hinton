'use strict';

var Rest = require('../models/Restaurant');
var bodyparser = require('body-parser');

module.exports = function (router) {
  router.use(bodyparser.json());

  router.get('/restaurant/all', function (req, res) {
    Rest.find({}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json(data);
    });
  });

  router.get('/restaurant/:id', function (req, res) {
    Rest.findOne({'_id': req.params.id}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json(data);
    });
  });

};
