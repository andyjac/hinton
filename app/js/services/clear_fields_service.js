'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.factory('clearFieldsService', function() {
    return function clearFields(obj) {
      var collection = _.cloneDeep(obj);

      if (Array.isArray(collection)) {
        var i = collection.length;

        while(i--) {
          if (typeof collection[i] === 'object') {
            collection[i] = clearFields(collection[i]);
          } else {
            collection.splice(i, 1);
          }
        }
      } else {
        Object.keys(collection).forEach(function(value) {
          if (collection.hasOwnProperty(value) && collection[value] !== null) {
            if (typeof collection[value] === 'object') {
              collection[value] = clearFields(collection[value]);
            } else if (typeof collection[value] === 'number') {
              collection[value] = 0;
            } else {
              collection[value] = '';
            }
          }
        });
      }

      return collection;
    };
  });
};
