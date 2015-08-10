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

    var genres = [];
    var restaurantList = [];
    var restaurantNames = [];

    return {
      restaurantData: function() {
        return restaurantData;
      },

      mapData: function() {
        return mapData;
      },

      genres: function() {
        return genres;
      },

      restaurantList: function() {
        return restaurantList;
      },

      restaurantNames: function() {
        return restaurantNames;
      },

      addItem: function(arr, item) {
        arr.push(item);
      },

      removeItem: function(arr, index) {
        arr.splice(index, 1);
      },

      setPrice: function(price) {
        restaurantData.price = price;
      },

      getAllGenres: function(callback) {
        Genres.getAll(function(err, data) {
          if (err) {
            callback(err);
          }

          genres = data;
          callback(null, data);
        });
      },

      getAllRestaurants: function(callback) {
        Restaurants.getAll(function(err, data) {
          if (err) {
            callback(err);
          }

          restaurantList = data;
          restaurantNames = [];

          _.forEach(data, function(restaurant) {
            restaurantNames.push(restaurant.name);
          });

          callback(null, data);
        });
      },

      getRestaurant: function(restaurant, callback) {
        var restaurantObj = _.find(restaurantList, 'name', restaurant);
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
