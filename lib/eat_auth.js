'use strict';

var eat = require('eat');
var Admin = require('../models/Admin');

module.exports = function eatAuth(secret) {
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

      Admin.findOne({_id: decoded.id}, function(err, admin) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
        }

        if (!admin) {
          console.log('no admin found for that token');
          return res.status(401).json({msg: 'not authorized'})''
        }

        req.admin = admin;
        next();
      });
    });
  }
};
