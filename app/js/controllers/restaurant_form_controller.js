'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.controller('restaurantFormController', ['$scope', 'clearFields', function($scope, clearFields) {

    $scope.restaurant = {
      name: '',
      genres: [],
      phone: '',
      price: 0,
      address: {},
      menuItem: '',
      blog: '',
      site: '',
      menu: ''
    };

    $scope.existingGenres = ['Pizza', 'Food Truck', 'Mexican', 'Thai'];

    $scope.setGenre = function(genre) {
      $scope.genre = genre;
    };

    $scope.addGenre = function(genre) {
      if (genre.trim() !== '') {
        $scope.restaurant.genres.push(genre);
        $scope.genre = '';
      }

      angular.element('#r_genre').focus();
    };

    $scope.removeGenre = function(index) {
      $scope.restaurant.genres.splice(index, 1);
    };

    $scope.setPrice = function(price) {
      $scope.restaurant.price = price;
      var priceNum = price;
      var dollars = '';

      while(priceNum--) {
        dollars += '$';
      }

      $scope.priceDollars = dollars;
    };

    $scope.isNotEmpty = function(obj) {
      return Object.keys(obj).length;
    };

    $scope.submitForm = function() {
      var restaurantInfo = $scope.restaurant;
      console.log(restaurantInfo);
      clearFields(restaurantInfo);
    };

    $scope.populateAddress = function() {
      _.forEach($scope.details.address_components, function(item) {
        if (_.includes(item.types, 'street_number')) {
          $scope.restaurant.address.number = item.short_name;
        }

        if (_.includes(item.types, 'route')) {
          $scope.restaurant.address.street = item.short_name;
        }

        if (_.includes(item.types, 'locality')) {
          $scope.restaurant.address.city = item.short_name;
        }

        if (_.includes(item.types, 'administrative_area_level_1')) {
          $scope.restaurant.address.state = item.short_name;
        }

        if (_.includes(item.types, 'postal_code')) {
          $scope.restaurant.address.zip = item.short_name;
        }
      });

      if($scope.details.name) {
        $scope.restaurant.name = $scope.details.name;
      }

      if($scope.details.international_phone_number) {
        $scope.restaurant.phone = $scope.details.international_phone_number;
      } else if ($scope.details.formatted_phone_number) {
        $scope.restaurant.phone = $scope.details.formatted_phone_number;
      }

      if($scope.details.price_level) {
        $scope.setPrice($scope.details.price_level+1); //price_level [0-4]
      }

      if($scope.details.website) {
        $scope.restaurant.site = $scope.details.website;
      }
    };

  }]);
};
