module.exports = function(app) {
  app.directive('autofocusDirective', function($timeout) {
    return {
      restrict: 'A',
      link: function($scope, $element) {
        $timeout(function() {
          $element.find('input').focus();
        }, 500);
      }
    };
  });
};
