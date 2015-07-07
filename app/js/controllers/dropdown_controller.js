'use strict';

module.exports = function(app) {
  app.controller("dropdownController", function($scope) {
    $scope.genres = [
    {name: "Mexican"},
    {name: "Chinese"},
    {name: "Thai"},
    {name: "Pizza"},
    {name: "Greek"},
    {name: "Cuban"}
    ];

    $scope.genre = "";
  });

  app.run(function($rootScope) {
    angular.element(document).on("click", function(e) {
      $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });
  });
};
