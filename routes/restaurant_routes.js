'use strict';

var Rest = require('../models/Restaurant');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function (router) {
  router.use(bodyparser.urlencoded({extended: true}));
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

  router.get('/restaurant/genre', function(req, res) {
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

  router.post('/restaurant', eatAuth, function(req, res) {
    var newRest = new Rest(req.body);

    newRest.save(function(err, rest) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json({msg: 'save successful'});
    });
  });

  router.put('/restaurant/:id', eatAuth, function(req, res) {
    var update = req.body;
    delete update._id;

    Rest.update({'_id': req.params.id}, update, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json({msg: 'update successful'});
    });
  });

  router.delete('/restaurant/:id', eatAuth, function(req, res) {
    Rest.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json({msg: 'delete successful'});
    });
  });

};
