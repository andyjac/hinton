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
        return res.status(500).json({msg: 'internal server error'});
      }
      newAdmin.basic.password = hash;
    });

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
};
