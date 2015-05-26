var Rest = require('../models/Restaurant');

module.exports = function (req, res) {
  Rest.findOne({'_id': req.params.id}, 'restaurant', function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }
    res.status(200).json(data);
  });
};
