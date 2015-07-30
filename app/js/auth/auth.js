'use strict';

module.exports = function(app) {
  app.factory('auth', ['$http', '$base64', '$cookies', function($http, $base64, $cookies) {
    return {

      signIn: function(user, callback) {
        var encoded = $base64.encode(user.email + ':' + user.password);
        user.username = user.email;
        $http.get('/hinton', {
            headers: {'Authorization': 'Basic ' + encoded}
          })
          .success(function (data) {
            $cookies.put('eat', data.token);
            callback(null);
          })
          .error(function (data) {
            callback(data);
          });
      },

      create: function(user, callback) {
        user.username = user.email;
        $http.post('/hinton/user/create_user/client', user)
          .success(function(data) {
            $cookies.put('eat', data.token);
            callback(null);
          })
          .error(function(data) {
            callback(data);
          });
      },

      isSignedIn: function() {
        return !!($cookies.get('eat') && $cookies.get('eat').length);
      }

    };
  }]);
};
