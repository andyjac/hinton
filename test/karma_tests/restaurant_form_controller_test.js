'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('restaurant form controller', function() {
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a new restaurant form controller', function() {
    var restaurantFormController = $ControllerConstructor('restaurantFormController', {$scope: $scope});
    expect(typeof restaurantFormController).toBe('object');
    expect(typeof $scope.isSignedIn).toBe('function');
    expect(typeof $scope.logout).toBe('function');
    expect(typeof $scope.updateFromDB).toBe('function');
    expect(typeof $scope.handleError).toBe('function');
    expect(typeof $scope.handleResponse).toBe('function');
    expect(typeof $scope.setRestaurant).toBe('function');
    expect(typeof $scope.addGenre).toBe('function');
    expect(typeof $scope.removeGenre).toBe('function');
    expect(typeof $scope.addMenuItem).toBe('function');
    expect(typeof $scope.removeMenuItem).toBe('function');
    expect(typeof $scope.setPrice).toBe('function');
    expect(typeof $scope.clearForm).toBe('function');
    expect(typeof $scope.submitForm).toBe('function');
    expect(typeof $scope.deleteWarning).toBe('function');
    expect(typeof $scope.deleteRestaurant).toBe('function');
    expect(typeof $scope.populateAddress).toBe('function');
  });

  describe('controller functionality', function() {
    beforeEach(angular.mock.inject(function() {
      this.restaurantFormController = $ControllerConstructor('restaurantFormController', {$scope: $scope});
    }));

    it('should set price in dollar signs', function() {
      $scope.setPrice(2);
      expect($scope.priceDollars).toBe('$$');
    });

    it('should handle error', function() {
      spyOn($scope, 'logout');
      var err = {};
      err.msg = 'not authorized';
      $scope.handleError(err);
      expect($scope.logout).toHaveBeenCalled();
      $scope.err_save = '';
      err.msg = 'internal server error';
      $scope.handleError(err);
      expect($scope.err_save).toBe('internal server error');
    });

    it('should handle response', function() {
      spyOn($scope, 'updateFromDB');
      spyOn($scope, 'clearForm');
      spyOn($scope, 'successAlert');
      spyOn($scope, 'handleError');
      $scope.handleResponse({'msg': 'error'});
      expect($scope.handleError).toHaveBeenCalled();
      expect($scope.updateFromDB).not.toHaveBeenCalled();
      $scope.handleResponse(null, {});
      expect($scope.updateFromDB).toHaveBeenCalled();
      expect($scope.clearForm).toHaveBeenCalled();
      expect($scope.successAlert).toHaveBeenCalled();
    });
  });
});
