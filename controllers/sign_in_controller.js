var User = require('../models/User');

module.exports = function(req, res) {
  req.user.generateToken(process.env.APP_SECRET, function(err, token) {
    if (err) {
      console.log(err);
      return res.status(500).json({msg : 'problem generating token'});
    }

    res.status(200).json({token: token});
  });
};
