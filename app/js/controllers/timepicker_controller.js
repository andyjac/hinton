'use strict';

module.exports = function(app) {
  app.controller("timepickerController", function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.clear = function() {
      $scope.mytime = null;
    };
  });
};
