'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.controller('restaurantFormController', ['$scope', 'authService', 'restaurantService', 'modalService', function($scope, authService, restaurantService, modalService) {
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
      $scope.signIn();
    };

    $scope.updateFromDB = function() {
      if (!$scope.isSignedIn()) {
        return $scope.signIn();
      }

      angular.element('#gSearch').focus();

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

      // angular.element('#r_item').focus();
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

    $scope.successAlert = function() {
      var modalDefaults = {
        templateUrl: '../../templates/views/success_alert.html',
        size: 'sm'
      };

      modalService.showModal(modalDefaults).then(function(result) {
        console.log(result);
      });
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

          $scope.updateFromDB();
          $scope.clearForm();
          $scope.successAlert();
        });
      } else {
        restaurantService.saveRestaurant(id, restaurantInfo, function(err, data) {
          if (err) {
            $scope.err_save = err.msg;
            return;
          }

          $scope.updateFromDB();
          $scope.clearForm();
          $scope.successAlert();
        });

        $scope.editing = false;
      }
    };

    $scope.deleteWarning = function() {
      var modalDefaults = {
        templateUrl: '../../templates/views/delete_warning.html',
        size: 'sm',
      };

      modalService.showModal(modalDefaults).then(function(confirm) {
        if (confirm) {
          $scope.deleteRestaurant();
        }
      });
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
      console.log($scope.restaurant.photos.length);
    };

    $scope.selectFiles = function() {

      var modalDefaults = {
          templateUrl: '../../templates/views/upload_files.html',
          size: 'lg' //this css is overridden in .modal-lg
      };

      modalService.showModal(modalDefaults, {}).then(function (result) {
        Array.prototype.push.apply($scope.restaurant.photos, result); //puts on scope
        //upload to s3 handled in s3 service, progress in modal

      });
    };

    $scope.removePhoto = function(index) { //move to restaurant service
      $scope.restaurant.photos.splice(index, 1);
      //removes photo from db if photos.delete is true, and removes from s3.
    };

    $scope.hidePhoto = function(index) {
      //sets show flag for pictures to be shown in mobile app
    };

    $scope.signIn = function() {
      var modalDefaults = {
        templateUrl: '../../templates/views/sign_in.html',
        size: 'sm',
      };

      modalService.showModal(modalDefaults).then(function(result) {
        console.log(result);
        $scope.updateFromDB();
      });
    };
  }]);
};
