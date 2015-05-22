'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function adminAuth(secret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;

    if (!token) {
      console.log('unauthorized no token in request');
      return res.status(401).send('<h1>Not authorized</h1>');
    }

    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).send('<h1>Not authorized</h1>');
      }

      User.findOne({tokenId: decoded.id}, function(err, user) {
        if (err) {
          console.log(err);
          return res.status(500).send('<h1>Server error</h1>');
        }

        if (!user.isAdmin) {
          console.log('not admin user');
          return res.status(401).send('<h1>Not authorized</h1>');
        }

        req.user = user;
        next();
      });
    });
  };
};
