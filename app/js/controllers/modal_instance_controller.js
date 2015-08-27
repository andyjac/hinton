'use strict';

module.exports = function(app) {
  app.controller('modalInstanceController', ['$scope', '$modalInstance', 'authService', function($scope, $modalInstance, authService) {
    $scope.errors = [];

    $scope.ok = function(result) {
      $modalInstance.close(result);
    };

    $scope.close = function(reason) {
      $modalInstance.dismiss(reason);
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
    };

    /**
     * ========= >>Upload ============
     */
    $scope.initTempImg = function() {
      $scope.tempImg = [{
        url: '',
        caption: '',
        show: true
      }];
    };

    $scope.setFiles = function(element) {
      $scope.$apply(function($scope) {
        $scope.files = [];

        for (var i = 0; i < element.files.length; i++) {
          $scope.files.push(element.files[i]);
          console.log(element.files[i]);
        }
        });
    };

    $scope.removeFile = function(index) {
      console.log('repeat-index: ' + index);
      $scope.files.splice(index, 1);
    };

    $scope.upload = function() {
      $scope.ok($scope.tempImg);
      console.log('photos: ' + $scope.tempImg);
    };

    $scope.initTempImg();

    /**
     * ========= Upload<< ============
     */

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
