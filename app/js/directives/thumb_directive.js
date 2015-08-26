'use strict';

module.exports = function(app) {
  app.directive('thumbDirective', [function() {
    console.log('got here...');

    return {
      restrict: 'A',
      replace: true,
      // declaring controller here throws a 'unknown injector' error
      // controller: 'modalInstanceController',
      scope: {
        file: '='
      },

      // template: '<img src="src">',
      // controller: ['fileReader', function(fileReader) {
      link: function(scope, el, attrs) {
        console.log(scope.file);
        var reader = new FileReader();
        reader.onload = function() {
           var filesrc = reader.result;
          el.html('src="filesrc"');
        };
        reader.readAsDataURL(scope.file);
        scope.$apply(); // this throws a '$digest already in progress' error
      }
    };
  }]);
};
