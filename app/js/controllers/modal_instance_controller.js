'use strict';

module.exports = function(app) {
  app.controller('modalInstanceController', ['$scope', '$modalInstance', '$location', 'authService', function($scope, $modalInstance, $location, authService) {
    $scope.errors = [];

    $scope.ok = function(result) {
      $modalInstance.close(result);
    };

    $scope.cancel = function(reason) {
      $modalInstance.dismiss(reason);
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
    };

    $scope.signIn = function(user) {
      $scope.clearErrors();

      authService.signIn(user, function(err, data) {
        if (err) {
          console.log(err);
          return $scope.errors.push({msg: 'Your credentials were incorrect.'});
        }

        $scope.ok({msg: 'sign in successful'});
      });
    };
  }]);
};
