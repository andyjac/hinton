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
    $scope.tempImg = [];

    $scope.setFiles = function(element) {
      $scope.$apply(function($scope) {
        $scope.selectedFiles = [];  // change var name

        for (var i = 0; i < element.files.length; i++) {
          $scope.selectedFiles.push(element.files[i]);
          console.log($scope.selectedFiles[i].name + ' ' + $scope.selectedFiles[i].size);
        }
      });
    };

    $scope.removeFile = function(index) {
      $scope.selectedFiles.splice(index, 1);
    };

    $scope.upload = function() {
      $scope.ok($scope.tempImg);
      angular.forEach($scope.tempImg, function(item, key){ // var check please leave for now
        angular.forEach(item, function(value){
          console.log('<scope.ok tempImg --> ' + key + ': ' +value);
        });
      });
     };

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
