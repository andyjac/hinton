'use strict';

module.exports = function(app) {
  app.controller('restaurantFormController', ['$scope', 'clearFields', '$timeout', function($scope, clearFields, $timeout) {

    $scope.venue = {
      name: '',
      genres: [],
      price: '',
      menuItem: '',
      address: ''
    };

    $scope.addGenre = function(genre) {
      if (genre.trim() !== '') {
        $scope.venue.genres.push(genre);
        $scope.genre = '';
      }

      document.getElementById('r_genre').focus();
    };

    $scope.removeGenre = function(index) {
      $scope.venue.genres.splice(index, 1);
    };

    $scope.submitForm = function() {
      var restaurantInfo = $scope.venue;
      console.log(restaurantInfo);
      clearFields(restaurantInfo);
    };
  }]);
};
