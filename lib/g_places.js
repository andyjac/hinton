https = require('https');

/**
 * function to search google places
 * @param  {[object] name, lat, long from input form}
 * @return {[object] gp - literal with google place values for newRest }
 */
module.exports = function(params, callback) {

  var apikey = 'AIzaSyCY1BQZJ8B4_QjNr-UDFGvtInFs9SF7JM0';
  var radius = 100;

  //search for google place_id
  https.get({
    hostname: 'maps.googleapis.com',
    path: encodeURI('/maps/api/place/nearbysearch/json?name=' + params.name + '&location=' + params.lat + ',' + params.long + '&radius=' + radius + '&key=' + apikey)
  }, function(response) {

    var body = '';
    response.on('data', function(data) {
      body += data;
    });

    response.on('end', function() {
      var res = JSON.parse(body);
      var id=res.results[0].place_id;

      // get google places details with place_id (id)
      https.get({
        hostname: 'maps.googleapis.com',
        path: encodeURI('/maps/api/place/details/json?placeid=' + id + '&key=' + apikey)
      }, function(response) {

        var body = '';
        response.on('data', function(data) {
          body += data;
        });

        response.on('end', function() {
          var res = JSON.parse(body);
          var gp = parsePlace(res.result);

          callback(gp);
        });
      });
    });
  });
};

/**
 * function parsePlace builds gp object for newRest save
 * @param  {[object] place_result - google place details search response}
 * @return {[object] gp - object containing props to pass back to search callback}
 */
function parsePlace(place_result) {
  var obj = {
    g_phone: place_result.formatted_phone_number,
    g_iphone: place_result.international_phone_number,
    g_name: place_result.name,
    g_price: place_result.price_level,
    g_id: place_result.place_id,
    g_url: place_result.website
  };

  // convert places hours array to keyed object
  var g_obj = place_result.opening_hours.weekday_text;
  var day = [],
      hours = {};

  g_obj.forEach(function(el) {
    day = el.split(/:\s/);
    hours[day[0]] = day[1];
  });

  obj.g_hours = hours;

  return obj;
}





