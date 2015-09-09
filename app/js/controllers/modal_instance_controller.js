'use strict';

var s3config = require('../../../s3_config.json');

module.exports = function(app) {
  app.controller('modalInstanceController', ['$scope', '$timeout', '$modalInstance', 'authService', function($scope, $timeout, $modalInstance, authService) {
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
 * ========= >>Upload ============  this should prob move back to service...
 */
    $scope.tempImages = [];
    $scope.okFiles = [];
    $scope.s3Errors = [];

    $scope.setFiles = function(element) { // grabs file object and puts on $scope
      $scope.$apply(function($scope) {
        $scope.selectedFiles = [];

        for (var i = 0; i < element.files.length; i++) {
          $scope.selectedFiles.push(element.files[i]);
        }
      });
    };

    $scope.upload = function() { // upload to S3 via S3 SDK

      $scope.barData = 0;

      AWS.config.update({
        accessKeyId: s3config.awsId,
        secretAccessKey: s3config.secret
      });
      AWS.config.region = s3config.region;

      angular.forEach($scope.tempImages, function(theFile, key) {
        console.log(theFile);

        var s3 = new AWS.S3({params: {Bucket: s3config.bucket}});
        var params = {Key: s3config.folder + theFile.url, ACL: 'public-read', ContentType: theFile.type, Body: theFile.file};

        $scope.s3Result = s3.putObject(params, function (error, data) {
          if (error) {
            $scope.s3Errors.push(error); // display to user and handle TODO
            console.log('upload error --> ', error);
          } else {
            $scope.okFiles.push(data);
            console.log('upload success --> ', $scope.s3Result);
          }

          if($scope.okFiles.length === $scope.tempImages.length) { // accumulate finish callbacks
              $timeout(function() {
                $scope.addPhotos();
              }, 500);
          }

        }).on('httpUploadProgress', function(progress) {
          // console.log('http progress ', progress);
          $scope.$apply(function() {
            $scope.barData = Math.round(progress.loaded / progress.total * 100);
          });
        });

      });
    };

    $scope.addPhotos = function() {
      $scope.ok($scope.tempImages);
    };

    $scope.urlFormat = function(input) {
      return input.replace(/\s/g, '_');
    };

    $scope.removeFile = function(index) {
      $scope.selectedFiles.splice(index, 1);
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
