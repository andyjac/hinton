'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function adminAuth(secret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;

    if (!token) {
      console.log('unauthorized no token in request');
      return res.status(401).json({msg: 'not authorized'});
    }

    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'not authorized'});
      }

      User.findOne({tokenId: decoded.id}, function(err, user) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
        }

        if (!user.isAdmin) {
          console.log('not admin user');
          return res.status(401).json({msg: 'not authorized'});
        }

        req.user = user;
        next();
      });
    });
  };
};
