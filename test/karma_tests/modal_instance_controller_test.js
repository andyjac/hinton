'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('modal instance controller', function() {
  var $ControllerConstructor;
  var $scope;
  var $modalInstance;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $modalInstance = {
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a new modal instance controller', function() {
    var modalInstanceController = $ControllerConstructor('modalInstanceController', {$scope: $scope, $modalInstance: $modalInstance});
    expect(typeof modalInstanceController).toBe('object');
    expect(typeof $scope.ok).toBe('function');
    expect(typeof $scope.close).toBe('function');
    expect(typeof $scope.clearErrors).toBe('function');
    expect(typeof $scope.signIn).toBe('function');
  });

  describe('controller functionality', function() {
    beforeEach(angular.mock.inject(function() {
      this.modalInstanceController = $ControllerConstructor('modalInstanceController', {$scope: $scope, $modalInstance: $modalInstance});
    }));

    it('should modal ok be selected', function() {
      $scope.ok();
      expect($modalInstance.close).toHaveBeenCalled();
    });

    it('should modal close be selected', function() {
      $scope.close();
      expect($modalInstance.dismiss).toHaveBeenCalled();
    });

    it('should clear errors', function() {
      $scope.errors.push('Database error');
      expect($scope.errors.length).toBe(1);
      $scope.clearErrors();
      expect($scope.errors.length).toBe(0);
    });
  });
});
