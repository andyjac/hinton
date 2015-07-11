'use strict';

module.exports = function(app) {
  app.controller("timepickerController", function($scope, $log) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    // $scope.changed = function () {
    //   $log.log('Time changed to: ' + $scope.mytime);
    // };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  });
};
