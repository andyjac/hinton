'use strict';

module.exports = function(app) {
  app.factory('auth', ['$http', '$base64', '$cookies', function($http, $base64, $cookies) {
    return {

      signIn: function(user, callback) {

      }

      create: function(user, callback) {
        user.username = user.email;
        $http.post('hinton/user/create_user/client', user)
          .success(function(data) {
            $cookies.put('eat', data.token);
            callback(null);
          })
          .error(function(data) {
            callback(data);
          });
      }

    };
  }]);
};
