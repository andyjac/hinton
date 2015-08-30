'use strict';

var _ = require('lodash');

module.exports = function(app) {
  app.factory('clearFieldsService', function() {
    return function clearFields(obj) {
      var collection = _.cloneDeep(obj);

      if (_.isArray(collection)) {
        var i = collection.length;

        while(i--) {
          if (_.isObject(collection[i])) {
            collection[i] = clearFields(collection[i]);
          } else {
            collection.splice(i, 1);
          }
        }
      } else {
        _.forEach(_.keys(collection), function(value) {
          if (collection.hasOwnProperty(value) && collection[value] !== null) {
            if (_.isObject(collection[value])) {
              collection[value] = clearFields(collection[value]);
            } else if (_.isNumber(collection[value])) {
              collection[value] = 0;
            } else if (_.isString(collection[value])) {
              collection[value] = '';
            }
          }
        });
      }

      return collection;
    };
  });
};
