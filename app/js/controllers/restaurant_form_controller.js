'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.controller('restaurantFormController', ['$scope', '$http', 'clearFields', function($scope, $http, clearFields) {

    $scope.restaurant = {
      name: '',
      p_id: '',
      fullAddr: '',
      genre: [],
      phone: '',
      price: 0,
      address: {},
      menu_item: '',
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
      }
    };

    $scope.map = {
      loc: {
        lat: '',
        long: ''
      },
      caption: ''
    };

    $scope.existingGenres = [];

    $scope.setGenre = function(genre) {
      $scope.genre = genre;
    };

    $scope.addGenre = function(genre) {
      if (genre.trim() !== '') {
        $scope.restaurant.genre.push(genre);
        $scope.genre = '';
      }

      angular.element('#r_genre').focus();
    };

    $scope.removeGenre = function(index) {
      $scope.restaurant.genre.splice(index, 1);
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

    $scope.updateFromDB = function() {
      $http.get('/api/restaurant/genre/all')
        .success(function(data) {
          $scope.existingGenres = data;
        })
        .error(function(err) {
          console.log(err);
        });
    };

    $scope.submitForm = function() {
      var restaurantInfo = {};
      restaurantInfo.map = _.cloneDeep($scope.map);
      restaurantInfo.restaurant = _.cloneDeep($scope.restaurant);
      $http.post('/hinton/user/restaurant/client', restaurantInfo)
        .success(function(data) {
          console.log(data);
          $scope.updateFromDB();
          clearFields($scope.map);
          clearFields($scope.restaurant);
        })
        .error(function(err) {
          console.log(err);
        });
    };

    $scope.populateAddress = function() {
      _.forEach($scope.details.address_components, function(item) {

        if (_.includes(item.types, 'street_number')) {
          $scope.restaurant.address.number = item.short_name;
          return;
        }

        if (_.includes(item.types, 'route')) {
          $scope.restaurant.address.street = item.short_name;
          return;
        }

        if (_.includes(item.types, 'locality')) {
          $scope.restaurant.address.city = item.long_name;
          return;
        }

        if (_.includes(item.types, 'administrative_area_level_1')) {
          $scope.restaurant.address.state = item.short_name;
        } else if (_.includes(item.types, 'administrative_area_level_2')) {
            $scope.restaurant.address.state = item.short_name;
        }

        if (_.includes(item.types, 'country')) {
          if (item.short_name !== 'US') {
            $scope.restaurant.address.country = item.long_name;
          }
          return;
        }

        if (_.includes(item.types, 'postal_code')) {
          $scope.restaurant.address.zip = item.short_name;
        }
      });

      if($scope.details.formatted_address) {
        $scope.restaurant.fullAddr = $scope.details.formatted_address;
      }

      if($scope.details.place_id) {
        $scope.restaurant.p_id = $scope.details.place_id;
      }

      if($scope.details.name) { // && !($scope.restaurant.name)) {
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
        $scope.restaurant.r_site = $scope.details.website;
        $scope.restaurant.menu_link = $scope.details.website; //make same, can edit
      }

      // refactor opening_hours
      if($scope.details.opening_hours) {
        _.forEach($scope.details.opening_hours.weekday_text, function(item) {
          _.forEach(_.keys($scope.restaurant.hours), function(day) {
            if (_.includes(item, _.startCase(day))) {
              // strip day header ('Monday: ') in weekday_text
              $scope.restaurant.hours[day] = item.substring(item.indexOf(':') + 2);
            }
          });
        });
      }

      if($scope.details.geometry) {
        $scope.map.loc.lat = $scope.details.geometry.location.A;
        $scope.map.loc.long = $scope.details.geometry.location.F;
        $scope.map.caption = $scope.restaurant.name;
      }
    };
  }]);
};
