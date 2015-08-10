'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'authService', function($scope, $location, authService) {

    $scope.authSubmit = function(user) {
      if (user.password_confirmation) {
        authService.create(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not create user'});
          }

          $location.path('/sign_in');
        });
      } else {
        authService.signIn(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not sign in'});
          }

          $location.path('/');
        });
      }
    };
  }]);
};
