module.exports = function(app) {
  app.directive('dropdownDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/dropdown.html',
      scope: {
        containerClass: '@',
        buttonId: '@',
        buttonText: '@',
        ulId: '@',
        items: '=',
        select: '&'
      }
    };
  });
};
