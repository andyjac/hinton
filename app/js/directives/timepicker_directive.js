module.exports = function(app) {
  app.directive('timepickerDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/timepicker.html',
      scope: {
        day: '@',
        dayId: '@',
        labelText: '@',
        hoursStep: '@',
        minutesStep: '@'
      },
      transclude: true
    };
  });
};
