'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function eatAuth(secret) {
  return function(req, res, next) {
    // var uriToken = req.headers.eat || req.body.eat;
    // var token = decodeURIComponent(uriToken);
    var cookie = req.headers.cookie;
    var tokenarr = cookie.split('=')[1];
    var token = decodeURIComponent(tokenarr);
    // if (!token) {
    //   console.log('unauthorized no token in request');
    //   return res.status(401).send('<h1>Not authorized</h1>');
    // }

    console.log('token', token);
    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err, decoded);
        return res.status(401).send('<h1>Not authorized</h1>');
      }

      var timeSinceLogin = Date.now() - decoded.timeStamp;

      if (timeSinceLogin > (1000 * 60 * 30)) {
        return res.status(401).send('<h1>Session expired. Please log back in</h1>');
      }

      User.findOne({tokenId: decoded.id}, function(err, user) {
        if (err) {
          console.log(err);
          return res.status(500).send('<h1>Server error</h1>');
        }

        if (!user) {
          console.log('no user found for that token');
          return res.status(401).send('<h1>Not authorized</h1>');
        }

        req.user = user;
        next();
      });
    });
  };
};
