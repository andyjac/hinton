'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.factory('restaurantService', ['httpService', 'clearFieldsService', 'googlePlacesService', function(httpService, clearFieldsService, googlePlacesService) {
    var Restaurants = httpService('restaurants');
    var Genres = httpService('genres');
    var restaurantData = {
      name: '',
      genre: [],
      phone: '',
      price: 0,
      p_id: '',
      address: { number: '', street: '', city: '', state: '', zip: '', country: '' },
      menu_item: [],
      blog_link: '',
      r_site: '',
      menu_link: '',
      hours: { mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' },
      photos: []
    };
    var mapData = {
      loc: { lat: '', long: '' },
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

      addGenre: function(genre) {
        restaurantData = _.cloneDeep(restaurantData);
        restaurantData.genre.push(genre);
      },

      removeGenre: function(index) {
        restaurantData = _.cloneDeep(restaurantData);
        restaurantData.genre.splice(index, 1);
      },

      addMenuItem: function(item) {
        restaurantData = _.cloneDeep(restaurantData);
        restaurantData.menu_item.push(item);
      },

      removeMenuItem: function(index) {
        restaurantData = _.cloneDeep(restaurantData);
        restaurantData.menu_item.splice(index, 1);
      },

      setPrice: function(price) {
        restaurantData = _.cloneDeep(restaurantData);
        restaurantData.price = price;
      },

      getAllGenres: function(callback) {
        Genres.getAll(function(err, data) {
          if (err) {
            callback(err);
          }

          genres = _.cloneDeep(genres);
          genres = data;
          callback(null, data);
        });
      },

      getAllRestaurants: function(callback) {
        Restaurants.getAll(function(err, data) {
          if (err) {
            callback(err);
          }

          restaurantList = _.cloneDeep(restaurantList);
          restaurantNames = _.cloneDeep(restaurantNames);
          restaurantList = data;
          restaurantNames = [];

          _.forEach(data, function(restaurant) {
            restaurantNames.push(restaurant.name);
          });

          callback(null, data);
        });
      },

      getRestaurant: function(restaurant, callback) {
        var id = _.result(_.find(restaurantList, 'name', restaurant), '_id');

        Restaurants.getOne(id, function(err, data) {
          if (err) {
            callback(err);
          }

          restaurantData = _.cloneDeep(restaurantData);
          mapData = _.cloneDeep(mapData);
          restaurantData = data.restaurant;
          mapData = data.map;
          callback(null, data);
        });
      },

      clearForm: function() {
        restaurantData = clearFieldsService(restaurantData);
        mapData = clearFieldsService(mapData);
      },

      createRestaurant: function(restaurant, callback) {
        Restaurants.create(restaurant, function(err, data) {
          if (err) {
            callback(err);
          }

          callback(null, data);
        });
      },

      saveRestaurant: function(id, restaurant, callback) {
        Restaurants.save(id, restaurant, function(err, data) {
          if (err) {
            callback(err);
          }

          callback(null, data);
        });
      },

      removeRestaurant: function(id, callback) {
        Restaurants.remove(id, function(err, data) {
          if (err) {
            callback(err);
          }

          callback(null, data);
        });
      },

      googlePopulate: function(details) {
        var googlePlacesInfo = googlePlacesService.populateInfo(details, restaurantData, mapData);

        restaurantData = _.cloneDeep(restaurantData);
        mapData = _.cloneDeep(mapData);
        restaurantData = googlePlacesInfo.restaurant;
        mapData = googlePlacesInfo.map;
      }
    };
  }]);
};
