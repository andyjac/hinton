'use strict';

module.exports = function(app) {
  app.directive('onLoadDirective', function($timeout) {
    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        //element hidden on init in controller
        $scope.$on('$viewContentLoaded', function() {
          $timeout(function() {
            elem.fadeIn(600, "swing", function() {
              $scope.$apply(function() {
								angular.element('#spinner').remove();
              });
            });
          }, 500);
        });
      }
    };
  });
};
