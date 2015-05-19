'use strict';

var User = require('../models/User');
var bodyparser = require('body-parser');
var adminAuth = require('../lib/admin_auth')(process.env.APP_SECRET);

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/user/create_user', adminAuth, function(req, res) {
    var newUserData = JSON.parse(JSON.stringify(req.body));
    delete newUserData.email;
    delete newUserData.password;
    delete newUserData.isAdmin;

    var newUser = new User(newUserData);
    newUser.isAdmin = false;
    newUser.basic.email = req.body.email;
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
          res.json({token: token});
        });
      });
    });
  });

  router.get('/user/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg : 'problem generating token'});
      }

      res.json({token: token});
    });
  });
};
