'use strict';

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
      $scope.venue.address.number = $scope.details.address_components[0].short_name;
      $scope.venue.address.street = $scope.details.address_components[1].short_name;
      $scope.venue.address.city = $scope.details.address_components[3].short_name;
      $scope.venue.address.state = $scope.details.address_components[5].short_name;
      $scope.venue.address.zip = $scope.details.address_components[7].short_name;
    };

  }]);
};
