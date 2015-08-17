'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.controller('restaurantFormController', ['$scope', '$window', 'authService', 'restaurantService', 'modalService', function($scope, $window, authService, restaurantService, modalService) {
    $scope.restaurant = restaurantService.restaurantData();
    $scope.map = restaurantService.mapData();
    $scope.genres = restaurantService.genres();
    $scope.restaurantList = restaurantService.restaurantList();
    $scope.restaurantNames = restaurantService.restaurantNames();

    $scope.isSignedIn = function() {
      return authService.isSignedIn();
    };

    $scope.logout = function() {
      authService.logout();
    };

    $scope.updateFromDB = function() {
      restaurantService.getAllGenres(function(err, data) {
        if (err) {
          return console.log(err);
        }

        $scope.genres = restaurantService.genres();
      });

      restaurantService.getAllRestaurants(function(err, data) {
        if (err) {
          return console.log(err);
        }

        $scope.restaurantList = restaurantService.restaurantList();
        $scope.restaurantNames = restaurantService.restaurantNames();
      });
    };

    $scope.setRestaurant = function(restaurant) {
      restaurantService.getRestaurant(restaurant, function(err, data) {
        if (err) {
          return console.log(err);
        }

        $scope.restaurant = restaurantService.restaurantData();
        $scope.map = restaurantService.mapData();
        $scope.r_id = data._id;
        $scope.setPrice($scope.restaurant.price);
        $scope.display_preview = true;
        $scope.editing = true;
      });
    };

    $scope.addGenre = function(genre) {
      if (genre.trim() !== '') {
        restaurantService.addGenre(genre.trim());
        $scope.restaurant = restaurantService.restaurantData();
        $scope.genre = '';
      }

      angular.element('#r_genre').focus();
    };

    $scope.removeGenre = function(index) {
      restaurantService.removeGenre(index);
      $scope.restaurant = restaurantService.restaurantData();
    };

    $scope.addMenuItem = function(menu_item) {
      if (menu_item.trim() !== '') {
        restaurantService.addMenuItem(menu_item.trim());
        $scope.restaurant = restaurantService.restaurantData();
        $scope.menu_item = '';
      }

      angular.element('#r_item').focus();
    };

    $scope.removeMenuItem = function(index) {
      restaurantService.removeMenuItem(index);
      $scope.restaurant = restaurantService.restaurantData();
    };

    $scope.setPrice = function(price) {
      restaurantService.setPrice(price);
      $scope.restaurant = restaurantService.restaurantData();
      var priceNum = price;
      var dollars = '';

      while(priceNum--) {
        dollars += '$';
      }

      $scope.priceDollars = dollars;
    };

    $scope.clearForm = function() {
      restaurantService.clearForm();

      $scope.restaurant = restaurantService.restaurantData();
      $scope.map = restaurantService.mapData();
      $scope.priceDollars = '';
      $scope.menu_item = '';
      $scope.err_save = '';
      $scope.display_preview = false;
    };

    $scope.submitForm = function() {
      var id = $scope.r_id;
      var restaurantInfo = {};
      restaurantInfo.map = _.cloneDeep($scope.map);
      restaurantInfo.restaurant = _.cloneDeep($scope.restaurant);

      if (!$scope.editing) {
        restaurantService.createRestaurant(restaurantInfo, function(err, data) {
          if (err) {
            $scope.err_save = err.msg;
            return;
          }

          console.log(data);
          $scope.updateFromDB();
          $scope.clearForm();
        });
      } else {
        restaurantService.saveRestaurant(id, restaurantInfo, function(err, data) {
          if (err) {
            $scope.err_save = err.msg;
            return;
          }

          console.log(data);
          $scope.updateFromDB();
          $scope.clearForm();
        });

        $scope.editing = false;
      }
    };

    $scope.deleteWarning = function() {  // functional placeholder - replace with modal
      var warning_message = "Are you sure you want to delete " + $scope.restaurant.name + "?";

      if ($window.confirm(warning_message)) {
        $scope.deleteRestaurant();
      }
    };

    $scope.deleteRestaurant = function() {
      //add bootstrap modal confirmation...
      var id = $scope.r_id;

      restaurantService.removeRestaurant(id, function(err, data) {
        if (err) {
          $scope.err_save = err.msg;
          return;
        }

        console.log(data);
        $scope.updateFromDB();
        $scope.clearForm();
      });

      $scope.editing = false;
    };

    $scope.populateAddress = function() {
      restaurantService.googlePopulate($scope.details);

      $scope.restaurant = restaurantService.restaurantData();
      $scope.map = restaurantService.mapData();
      $scope.setPrice($scope.restaurant.price);
      $scope.display_preview = true;
      $scope.editing = false;
    };

    $scope.uploadImages = function() {

      var modalOptions = {
          closeButtonText: 'Cancel',
          actionButtonText: 'Upload',
          headerText: 'Image Upload',
          bodyText: 'Click or drop images here to upload'
      };
      modalService.showModal({}, modalOptions).then(function (result) {
        //upload directive reference here, with service reference
      });
    };

  }]);
};
