'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('auth controller', function() {
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a new auth controller', function() {
    var authController = $ControllerConstructor('authController', {$scope: $scope});
    expect(typeof authController).toBe('object');
    expect(typeof $scope.authSubmit).toBe('function');
  });

});
