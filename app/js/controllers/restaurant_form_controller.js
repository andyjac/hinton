'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.controller('restaurantFormController', ['$scope', 'clearFields', function($scope, clearFields) {

    $scope.venue = {
      name: '',
      genres: [],
      price: '',
      menuItem: '',
      address: {}
    };

    $scope.addGenre = function(genre) {
      if (genre.trim() !== '') {
        $scope.venue.genres.push(genre);
        $scope.genre = '';
      }

      angular.element('#r_genre').focus();
    };

    $scope.removeGenre = function(index) {
      $scope.venue.genres.splice(index, 1);
    };

    $scope.isNotEmpty = function(obj) {
      return Object.keys(obj).length;
    };

    $scope.submitForm = function() {
      var restaurantInfo = $scope.venue;
      console.log(restaurantInfo);
      clearFields(restaurantInfo);
    };

    $scope.populateAddress = function() {
      _.forEach($scope.details.address_components, function(item) {
            if( _.includes(item.types, 'street_number')) {
                $scope.venue.address.number = item.short_name;
            }

            if( _.includes(item.types, 'route')) {
                $scope.venue.address.street = item.short_name;
            }

            if( _.includes(item.types, 'locality')) {
                $scope.venue.address.city = item.short_name;
            }

            if( _.includes(item.types, 'administrative_area_level_1')) {
                $scope.venue.address.state = item.short_name;
            }

            if( _.includes(item.types, 'postal_code')) {
                $scope.venue.address.zip = item.short_name;
            }
        });
    };

  }]);
};
