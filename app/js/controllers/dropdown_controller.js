'use strict';

module.exports = function(app) {
  app.controller("dropdownController", function($scope) {
    $scope.genres = [{
      name: "Red",
      hex: "#F21B1B"
    }, {
      name: "Blue",
      hex: "#1B66F2"
    }, {
      name: "Green",
      hex: "#07BA16"
    }];
    $scope.genre = "";
  });

  app.run(function($rootScope) {
    angular.element(document).on("click", function(e) {
      $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });
  });
};
