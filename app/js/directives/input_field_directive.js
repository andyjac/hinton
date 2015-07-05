module.exports = function(app) {
  app.directive('inputFieldDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/input_field.html',
      scope: {
        title: '@',
        id: '@',
        placeholderText: '@',
        model: '=',
        isRequired: '='
      },
      transclude: true
    };
  });
};