'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.factory('s3Service', ['$scope', function($scope) {




    return {
      s3Upload: function(files) {

      },

      makeThumb: function(image) {

      }

    };

  }]);
};
