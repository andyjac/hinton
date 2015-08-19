'use strict';

module.exports = function(app) {
  var handleError = function(callback) {
    return function(err) {
      console.log(err);
      callback(err);
    };
  };

  var handleSuccess = function(callback) {
    return function(data){
      callback(null, data);
    };
  };

  app.factory('httpService', ['$http', '$cookies', function($http, $cookies) {
    return function(resourceName) {
      return {
        getOne: function(id, callback) {
          $http.get('/admin/' + resourceName + '/' + id)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        getAll: function(callback) {
          var eat = $cookies.get('eat');
          $http.defaults.headers.common['eat'] = eat; // jshint ignore: line

          $http.get('/admin/' + resourceName)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        create:  function(resourceData, callback) {
          $http.post('/admin/' + resourceName, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        save: function(id, resourceData, callback) {
          $http.put('/admin/' + resourceName + '/' + id, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        remove: function(id, callback) {
          $http.delete('/admin/' + resourceName + '/' + id)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        }
      };
    };
  }]);
};
