'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.controller('restaurantFormController', ['$scope', 'authService', 'restaurantService', 'modalService', '$modal', '$timeout', function($scope, authService, restaurantService, modalService, $modal, $timeout) {
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
          return $scope.handleError(err);
        }

        $scope.genres = restaurantService.genres();

        restaurantService.getAllRestaurants(function(err, data) {
          if (err) {
            return $scope.handleError(err);
          }

          $scope.restaurantList = restaurantService.restaurantList();
          $scope.restaurantNames = restaurantService.restaurantNames();
        });
      });
    };

    $scope.handleError = function(err) {
      switch(err.msg) {
      case 'not authorized':
        $scope.logout();
        break;
      case 'internal server error':
        $scope.err_save = err.msg;
        break;
      }
    };

    $scope.handleResponse = function(err, data) {
      if (err) {
        return $scope.handleError(err);
      }

      $scope.updateFromDB();
      $scope.clearForm();
      $scope.successAlert();
    };

    $scope.setRestaurant = function(restaurant) {
      restaurantService.getRestaurant(restaurant, function(err, data) {
        if (err) {
          return $scope.handleError(err);
        }

        $scope.restaurant = restaurantService.restaurantData();
        $scope.map = restaurantService.mapData();
				$scope.restaurantName = $scope.restaurant.name;
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
      $scope.restaurant.photos = [];
      $scope.priceDollars = '';
      $scope.menu_item = '';
      $scope.display_preview = false;
    };

    $scope.submitForm = function() {
      $scope.restaurantName = $scope.restaurant.name;
      var id = $scope.r_id;
      var restaurantInfo = {
        map: _.cloneDeep($scope.map), restaurant: _.cloneDeep($scope.restaurant)
      };

      if (!$scope.editing) {
        $scope.operation = 'Saved';
        restaurantService.createRestaurant(restaurantInfo, $scope.handleResponse);
      } else {
        $scope.operation = 'Updated';
        restaurantService.saveRestaurant(id, restaurantInfo, $scope.handleResponse);
        $scope.editing = false;
      }
    };

    $scope.deleteRestaurant = function() {
      var id = $scope.r_id;
      $scope.operation = 'Deleted';
      restaurantService.removeRestaurant(id, $scope.handleResponse);
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

    $scope.removePhoto = function(index) {
      $scope.restaurant.photos[index].show = false;
      $scope.restaurant.photos[index].delete = true;
      // $scope.restaurant.photos.splice(index, 1);

      //marks photo to be deleted from db, removes from s3 via a chron.
    };

    // =========== MODALS ===========

    //  >> Delete Warning modal

    $scope.deleteWarning = function() {
      var modalDefaults = {
        templateUrl: '../../templates/views/delete_warning.html',
        size: 'sm',
        scope: $scope
      };

      modalService.showModal(modalDefaults).then(function(confirm) {
        if (confirm) {
          $scope.deleteRestaurant();
        }
      });
    };

    //  >> Success modal
    $scope.successAlert = function(msg) {
      var modalInstance = $modal.open( {
        templateUrl: '../../templates/views/success_alert.html',
        scope: $scope,
        size: 'sm',
        backdrop: false
      });

      modalInstance.opened.then(function () {
        $timeout(function() {
          modalInstance.dismiss('dismiss');
        }, 2600);
      });
    };

    //  >> File upload modal
    $scope.selectFiles = function() { // open upload modal with Photos button
      var s3Files = [];
      var modalDefaults = {
        templateUrl: '../../templates/views/upload_files.html',
      };

      modalService.showModal(modalDefaults).then(function(result) { // on return from modal .ok
        _.forEach(result, function(obj, i) {
          $scope.restaurant.photos.push({url: obj.url.replace(/\s/g, '_'), caption: obj.caption, delete: false, show: true});
          console.log('dbSave', $scope.restaurant.photos[i]);
        });
      });
    };

    // >> lightbox modal

    $scope.showPix = function(index) {
      $scope.picview = {
        url: 'https://hinton-images.s3.amazonaws.com/restpics/' + $scope.restaurant.photos[index].url,
        caption: $scope.restaurant.photos[index].caption
      };
      console.log('picview', $scope.picview.url, $scope.picview.caption);
      var modalInstance = $modal.open({
        templateUrl: '../../templates/views/image_view.html',
        windowTemplateUrl: '../../templates/views/lb-modal-window.html',
        scope: $scope
      });
    };

    // >> Sign-in modal

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
