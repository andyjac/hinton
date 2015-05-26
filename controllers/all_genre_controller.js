var Rest = require('../models/Restaurant');

module.exports = function(req, res) {
  Rest.find().distinct('restaurant.genre', function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }
    res.status(200).json(data);
  });
};
