'use strict';

var Admin = require('../models/Admin');
var bodyparser = require('body-parser');

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/admin', function(req, res) {
    var newAdminData = JSON.parse(JSON.stringify(req.body));
    delete newAdminData.email;
    delete newAdminData.password;

    var newAdmin = new Admin(newAdminData);
    newAdmin.basic.email = req.body.email;
    newAdmin.generateHash(req.body.password, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'could not process password'});
      }
      newAdmin.basic.password = hash;

      newAdmin.save(function(err, admin) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'user creation failed'});
        }
        admin.generateToken(process.env.APP_SECRET, function(err, token) {
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'token generation failed'});
          }
          res.json({token: token});
        });
      });
    });
  });

  router.get('/admin/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    console.log(req);
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg : 'problem generating token'});
      }

      res.json({token: token});
    });
  });
};
