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
      var eat = $cookies.get('eat');
      $http.defaults.headers.common['eat'] = eat; //jshint ignore: line

      return {
        getOne: function(id, callback) {
          $http.get(resourceName + '/' + id)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        getAll: function(callback) {
          $http.get(resourceName)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        create:  function(resourceData, callback) {
          $http.post(resourceName, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        save: function(id, resourceData, callback) {
          $http.put(resourceName + '/' + id, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        remove: function(id, callback) {
          $http.delete(resourceName + '/' + id)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        }
      };
    };
  }]);
};
