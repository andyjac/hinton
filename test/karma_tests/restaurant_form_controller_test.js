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

});
