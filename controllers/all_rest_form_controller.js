var Rest = require('../models/Restaurant');

module.exports = function(req, res) {
  Rest.find({}, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }

    var arr = [];
    data.map(function(item) {
      var obj = {};
      obj[item.restaurant.name] = item.restaurant.p_id;
      obj._id = item._id;
      arr.push(obj);
    });

    console.log(arr);
    res.status(200).json(arr);
  });
};
