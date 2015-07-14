module.exports = function(app) {
  app.directive('timepickerDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/timepicker.html',
      scope: {
        labelText: '@',
        modelOpen: '=',
        modelClose: '=',
        hoursStep: '@',
        minutesStep: '@'
      },
      transclude: true
    };
  });
};
