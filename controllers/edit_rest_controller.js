var Rest = require('../models/Restaurant');

module.exports = function(req, res) {
  var update = req.body;
  delete update._id;

  Rest.update({'_id': req.params.id}, update, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }
    res.status(200).json({msg: 'update successful'});
  });
};
