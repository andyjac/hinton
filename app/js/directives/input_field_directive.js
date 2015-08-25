module.exports = function(app) {
  app.directive('inputFieldDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/input_field.html',
      scope: {
        type: '@',
        title: '@',
        id: '@',
        placeholderText: '@',
        model: '=',
        isRequired: '=',
        isDisabled: '='
      },
      transclude: true
    };
  });
};
