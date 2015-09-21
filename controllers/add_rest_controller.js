var Rest = require('../models/Restaurant');

module.exports = function(req, res) {
  var newRest = new Rest(req.body);

  newRest.restaurant.address.fullAddress =
    newRest.restaurant.address.number + ' ' +
    newRest.restaurant.address.street + '\n' +
    newRest.restaurant.address.city + ', ' +
    newRest.restaurant.address.state + ' ' +
    newRest.restaurant.address.zip;

  newRest.save(function(err, rest) {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }
    res.status(200).json({msg: 'save successful'});
  });
};
