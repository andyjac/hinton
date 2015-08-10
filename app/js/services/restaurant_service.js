'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.factory('restaurantService', ['httpService', 'clearFieldsService', 'googlePlacesService', function(httpService, clearFieldsService, googlePlacesService) {
    var Restaurants = httpService('/admin/restaurant/all');
    var Genres = httpService('/api/restaurant/genre/all');
    var Restaurant = httpService('api/restaurant');
    var Admin = httpService('admin/restaurant');

    var restaurantData = {
      name: '',
      genre: [],
      phone: '',
      price: 0,
      p_id: '',
      address: {
        number: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      menu_item: [],
      blog_link: '',
      r_site: '',
      menu_link: '',
      hours: {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: '',
        sat: '',
        sun: ''
      },
    };

    var mapData = {
      loc: {
        lat: '',
        long: ''
      },
      caption: ''
    };

    var list = [];
    var names = [];

    return {
      buildRestaurant: function() {
        return restaurantData;
      },

      buildMap: function() {
        return mapData;
      },

      getAllGenres: function(callback) {
        Genres.getAll(function(err, data) {
          if (err) {
            callback(err);
          }

          callback(null, data);
        });
      },

      getAllRestaurants: function(callback) {
        Restaurants.getAll(function(err, data) {
          if (err) {
            callback(err);
          }

          list = data;
          names = [];

          _.forEach(data, function(restaurant) {
            names.push(restaurant.name);
          });

          callback(null, {list: list, names: names});
        });
      },

      getRestaurant: function(restaurant, callback) {
        var restaurantObj = _.find(list, 'name', restaurant);
        var id = restaurantObj._id;

        Restaurant.getOne(id, function(err, data) {
          if (err) {
            callback(err);
          }

          restaurantData = data.restaurant;
          callback(null, data);
        });
      },

      clearForm: function() {
        restaurantData = clearFieldsService(restaurantData);
        mapData = clearFieldsService(mapData);
      },

      createRestaurant: function(restaurant, callback) {
        Admin.create(restaurant, function(err, data) {
          if (err) {
            callback(err);
          }

          callback(null, data);
        });
      },

      saveRestaurant: function(id, restaurant, callback) {
        Admin.save(id, restaurant, function(err, data) {
          if (err) {
            callback(err);
          }

          callback(null, data);
        });
      },

      removeRestaurant: function(id, callback) {
        Admin.remove(id, function(err, data) {
          if (err) {
            callback(err);
          }

          callback(null, data);
        });
      },

      googlePopulate: function(details) {
        var googlePlacesInfo = googlePlacesService.populateInfo(details, restaurantData, mapData);

        restaurantData = googlePlacesInfo.restaurant;
        mapData = googlePlacesInfo.map;
      }
    };
  }]);
};
