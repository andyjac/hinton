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
  }]);
};
