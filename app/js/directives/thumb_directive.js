'use strict';

module.exports = function(app) {
  app.directive('thumbDirective', ['$fileReader', function($fileReader) {
    console.log('got here...');

    return {
      restrict: 'A',
      replace: true,
      controller: 'modalInstanceController',
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
        reader.readAsDataUrl(scope.file);
        scope.$apply();
      }
    };
  }]);
};
