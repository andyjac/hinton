'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.factory('googlePlacesService', function() {
    return {
      populateInfo: function(details, restaurantData, mapData) {
        var restaurant = _.cloneDeep(restaurantData);
        var map = _.cloneDeep(mapData);

        _.forEach(details.address_components, function(item) {

          if (_.includes(item.types, 'street_number')) {
            restaurant.address.number = item.short_name;
            return;
          }

          if (_.includes(item.types, 'route')) {
            restaurant.address.street = item.short_name;
            return;
          }

          if (_.includes(item.types, 'locality')) {
            restaurant.address.city = item.long_name;
            return;
          }

          if (_.includes(item.types, 'administrative_area_level_1')) {
            restaurant.address.state = item.short_name;
          } else if (_.includes(item.types, 'administrative_area_level_2')) {
            restaurant.address.state = item.short_name;
          }

          if (_.includes(item.types, 'country')) {
            restaurant.address.country = item.long_name;
            return;
          }

          if (_.includes(item.types, 'postal_code')) {
            restaurant.address.zip = item.short_name;
          }
        });

        if (details.formatted_address) {
          restaurant.fullAddr = details.formatted_address;
        }

        if (details.place_id) {
          restaurant.p_id = details.place_id;
        }

        if (details.name) {
          restaurant.name = details.name;
        }

        if (details.international_phone_number) {
          restaurant.phone = details.international_phone_number;
        } else if (details.formatted_phone_number) {
          restaurant.phone = details.formatted_phone_number;
        }

        if (details.price_level) {
          restaurant.price = details.price_level + 1;
        }

        if (details.website) {
          restaurant.r_site = details.website;
        }

        if (details.opening_hours) {
          _.forEach(details.opening_hours.weekday_text, function(item) {
            _.forEach(_.keys(restaurant.hours), function(day) {
              if (_.includes(item, _.startCase(day))) {
                restaurant.hours[day] = item.substring(item.indexOf(':') + 2);
              }
            });
          });
        }

        if (details.geometry) {
          map.loc.lat = details.geometry.location.lat();
          map.loc.long = details.geometry.location.lng();
          map.caption = restaurant.name;
        }

        return {
          restaurant: restaurant,
          map: map
        };
      }
    };
  });
};
