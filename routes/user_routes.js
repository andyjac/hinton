'use strict';

var User = require('../models/User');
var Rest = require('../models/Restaurant');
var bodyparser = require('body-parser');
var uuid = require('uuid');
var adminAuth = require('../lib/admin_auth')(process.env.APP_SECRET);
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router, passport) {
  router.use(bodyparser.urlencoded({extended: true}));
  router.use(bodyparser.json());

  router.post('/user/create_user', adminAuth, function(req, res) {
    var newUserData = JSON.parse(JSON.stringify(req.body));
    delete newUserData.email;
    delete newUserData.password;
    delete newUserData.isAdmin;
    delete newUserData.tokenId;

    var newUser = new User(newUserData);

    newUser.isAdmin = false;
    newUser.basic.email = req.body.email;
    newUser.tokenId = uuid.v4();

    newUser.generateHash(req.body.password, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'could not process password'});
      }
      newUser.basic.password = hash;

      newUser.save(function(err, user) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'user creation failed'});
        }
        user.generateToken(process.env.APP_SECRET, function(err, token) {
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'token generation failed'});
          }
          res.status(200).json({token: token});
        });
      });
    });
  });

  router.get('/', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg : 'problem generating token'});
      }

      var uriToken = encodeURIComponent(token);
      res.redirect('/hinton/user?valid=' + uriToken);
    });
  });

  router.post('/user/restaurant', eatAuth, function(req, res) {
    var newRest = new Rest(req.body);

    newRest.save(function(err, rest) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json({msg: 'save successful'});
    });
  });

  router.put('/user/restaurant/:id', eatAuth, function(req, res) {
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

  router.delete('/user/restaurant/:id', eatAuth, function(req, res) {
    Rest.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json({msg: 'delete successful'});
    });
  });
};
