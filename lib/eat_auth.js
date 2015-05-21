'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function eatAuth(secret) {
  return function(req, res, next) {
    var uriToken = req.headers.eat || req.body.eat;
    var token = decodeURIComponent(uriToken);

    if (!token) {
      console.log('unauthorized no token in request');
      return res.status(401).json({msg: 'not authorized'});
    }

    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'not authorized'});
      }

      var timeSinceLogin = Date.now() - decoded.timeStamp;

      if (timeSinceLogin > 3600000) {
        return res.status(401).json({msg: 'session expired. please log back in'});
      }

      User.findOne({tokenId: decoded.id}, function(err, user) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
        }

        if (!user) {
          console.log('no user found for that token');
          return res.status(401).json({msg: 'not authorized'});
        }

        req.user = user;
        next();
      });
    });
  };
};
