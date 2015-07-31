'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.controller('restaurantFormController', ['$scope', '$http', 'clearFields', function($scope, $http, clearFields) {

    $scope.restaurant = {
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
    $scope.restaurantList = [];

    $scope.updateFromDB = function() {
      $http.get('/api/restaurant/genre/all')
        .success(function(data) {
          $scope.existingGenres = data;
        })
        .error(function(err) {
          console.log(err);
        });

      $http.get('hinton/user/restaurant/all/client')
        .success(function(data) {
          $scope.restaurantList = data;
          $scope.restaurantNames = [];
          _.forEach(data, function(item) {
            $scope.restaurantNames.push(Object.keys(item)[0]);
          });
        })
        .error(function(err) {
          console.log(err);
        });
    };

    $scope.setRestaurant = function(restaurant) {
      $scope.restaurant.name = restaurant;
      var obj = _.find($scope.restaurantList, restaurant);

      $http.get('api/restaurant/' + obj._id)
        .success(function(data) {
          console.log(data);
          $scope.r_id = data._id;
          $scope.restaurant = _.cloneDeep(data.restaurant);
          $scope.setPrice($scope.restaurant.price);
          $scope.display_preview = true;
          $scope.editing = true;
          console.log($scope.restaurant.name + ': ' + $scope.r_id);
          console.log('editing: ' + $scope.editing);
        });
    };

    $scope.setGenre = function(genre) {
      $scope.genre = genre;
    };

    $scope.addGenre = function(genre) {
      if (genre.trim() !== '') {
        $scope.restaurant.genre.push(genre.trim());
        $scope.genre = '';
      }

      angular.element('#r_genre').focus();
    };

    $scope.removeGenre = function(index) {
      $scope.restaurant.genre.splice(index, 1);
    };

    $scope.addMenuItem = function(menuItem) {
      if (menuItem.trim() !== '') {
        $scope.restaurant.menu_item.push(menuItem.trim());
        $scope.menuItem = '';
      }

      angular.element('#r_item').focus();
    };

    $scope.removeMenuItem = function(index) {
      $scope.restaurant.menu_item.splice(index, 1);
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

    $scope.clearForm = function() {
      $scope.map = clearFields($scope.map);
      $scope.restaurant = clearFields($scope.restaurant);
      $scope.priceDollars = '';
      $scope.display_preview = false;
      $scope.err_save = '';
    };

    $scope.isNotEmpty = function(obj) {
      return Object.keys(obj).length;
    };

    $scope.submitForm = function(id) {
      var restaurantInfo = {};
      restaurantInfo.map = _.cloneDeep($scope.map);
      restaurantInfo.restaurant = _.cloneDeep($scope.restaurant);
      if (!$scope.editing) {
        $http.post('/hinton/user/restaurant/client', restaurantInfo)
        .success(function(data) {
          console.log(data);
          $scope.updateFromDB();
          $scope.clearForm();
        })
        .error(function(err) {
          console.log(err);
          $scope.err_save = err.msg;
        });

      } else {
        $http.put('/hinton/user/restaurant/client/' + $scope.r_id, restaurantInfo)
        .success(function(data) {
          console.log(data);
          $scope.updateFromDB();
          $scope.clearForm();
        })
        .error(function(err) {
          console.log(err);
          $scope.err_save = err.msg;
        });
      }

      $scope.editing = false;
    };

    $scope.deleteRestaurant = function(id) {
      //add bootstrap modal confirmation...
      $http.delete('/hinton/user/restaurant/client/' + $scope.r_id)
      .success(function(data) {
          console.log(data);
          $scope.updateFromDB();
          $scope.clearForm();
        })
        .error(function(err) {
          console.log(err);
          $scope.err_save = err.msg;
        });
        $scope.editing = false;
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
          $scope.restaurant.address.country = item.long_name;
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
        $scope.restaurant.r_site = $scope.details.website;
      }

      if($scope.details.opening_hours) {
        _.forEach($scope.details.opening_hours.weekday_text, function(item) {
          _.forEach(_.keys($scope.restaurant.hours), function(day) {
            if (_.includes(item, _.startCase(day))) {
              $scope.restaurant.hours[day] = item.substring(item.indexOf(':') + 2);
            }
          });
        });
      }

      if($scope.details.geometry) {
        $scope.map.loc.lat = $scope.details.geometry.location.G;
        $scope.map.loc.long = $scope.details.geometry.location.K;
        $scope.map.caption = $scope.restaurant.name;
      }

      $scope.display_preview = true;
      $scope.editing = false;
    };
  }]);
};
