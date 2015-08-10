'use strict';

module.exports = function(app) {
  app.factory('authService', ['$http', '$base64', '$cookies', '$location', function($http, $base64, $cookies, $location) {
    return {
      signIn: function(user, callback) {
        var encoded = $base64.encode(user.email + ':' + user.password);
        user.username = user.email;

        $http.get('/admin/sign_in', {
            headers: {'Authorization': 'Basic ' + encoded}
          })
          .success(function (data) {
            $cookies.put('eat', data.token);
            callback(null);
          })
          .error(function (err) {
            console.log(err);
            callback(err);
          });
      },

      create: function(user, callback) {
        user.username = user.email;

        $http.post('/admin/create_user', user)
          .success(function(data) {
            $cookies.put('eat', data.token);
            callback(null);
          })
          .error(function(err) {
            console.log(err);
            callback(err);
          });
      },

      isSignedIn: function() {
        return !!($cookies.get('eat') && $cookies.get('eat').length);
      },

      logout: function() {
        console.log('logout called from auth service');
        $cookies.put('eat', '');
        $location.path('/sign_in');
      }
    };
  }]);
};
