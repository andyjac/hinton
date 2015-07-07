module.exports = function(app) {
  app.factory('clearFields', function() {
    return function(obj) {
      Object.keys(obj).forEach(function(key) {
        if (Array.isArray(obj[key])) {
          obj[key] = [];
        } else if (typeof obj[key] === 'object') {
          obj[key] = {};
        } else {
          obj[key] = '';
        }
      });
      return obj;
    };
  });
};
