'use strict';

module.exports = function(app) {
  app.directive('thumbDirective', [function() {

    return {
      restrict: 'A',
      replace: false,
      scope: {
        file: '='
      },

      link: function(scope, el, attrs) {
        var reader = new FileReader();
        reader.onload = function() {
          var targetFile = reader.result;
          el.css('background-image', 'url(' + targetFile + ')');
        };
        reader.readAsDataURL(scope.file);
      }
    };
  }]);
};
