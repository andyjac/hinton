'use strict';

var Basic = require('passport-http').BasicStrategy;
var Admin = require('../models/Admin');

module.exports = function basicStrat(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    Admin.findOne({'basic.email': email}, function(err, admin) {
      if (err) return done(err);

      if (!admin) return done('no such admin');

      admin.checkPassword(password, function(err, isSame) {
        if (err) return done(err);

        if (!isSame) return done('wrong password');

        return done(null, admin);
      });
    });
  }));
};
