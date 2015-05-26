var User = require('../models/User');
var uuid = require('uuid');

module.exports = function(req, res) {
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
};
