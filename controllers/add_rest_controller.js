var Rest = require('../models/Restaurant');
var getPlaceDetails = require('../lib/g_places');

module.exports = function(req, res) {
  var newRest = new Rest(req.body);

  // req.body namespaces
  var rest = req.body.restaurant,
      loc = req.body.map.loc;

  //call g_places.js
  getPlaceDetails({name:rest.name, lat:loc.lat, long:loc.long}, gVals);

  /**
   * sets newRest vars from google places result - getPlaceDetails callback
   * @param  {[object] obj - google places object from g_places.js}
   */
  function gVals(obj) {

    // assign google hours to newRest hours
    var hdays = ['mon','tue','wed','thu','fri','sat','sun'];
    var gdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    for (var i=0; i<7; i++) {
      newRest.restaurant.hours[hdays[i]] = obj.g_hours[gdays[i]];
    }

    newRest.restaurant.name = obj.g_name;
    newRest.restaurant.price = obj.g_price;
    newRest.restaurant.phone = obj.g_phone;
    newRest.restaurant.place_id = obj.g_id;
    newRest.restaurant.r_site = obj.g_url;

    saveRecord();
  }

  function saveRecord() {
    newRest.save(function(err, rest) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.status(200).json({msg: 'save successful'});
    });
  }
};
