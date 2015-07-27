var _ = require('lodash');

module.exports = function(app) {
  app.factory('clearFields', function() {
    return function clearFields(obj) {
      var collection = _.cloneDeep(obj);

      if (Array.isArray(collection)) {
        var i = collection.length;

        while(i--) {
          if (Array.isArray(collection[i])) {
            current = clearFields(collection[i]);
          } else if (typeof current === 'object') {
            current = clearFields(collection[i]);
          } else {
            collection.splice(i, 1);
          }
        }
      } else {
        Object.keys(collection).forEach(function(value) {
          if (collection.hasOwnProperty(value) && collection[value] !== null) {
            if (Array.isArray(collection[value])) {
              collection[value] = clearFields(collection[value]);
            } else if (typeof collection[value] === 'object') {
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
