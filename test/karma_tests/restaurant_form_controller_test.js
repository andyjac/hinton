'use strict';

require('../../app/js/client');
require('angular-mocks');
var data = require('./restaurant_data');
var details = require('./google_places_details');

describe('restaurant form controller', function() {
  var $ControllerConstructor;
  var $scope;
  var $httpBackend;
  var authService;

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
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      authService = {
        signIn: jasmine.createSpy('authService.signIn'),
        isSignedIn: jasmine.createSpy('authService.isSignedIn').and.returnValue(true),
        logout: jasmine.createSpy('authService.logout')
      };
      this.restaurantFormController = $ControllerConstructor('restaurantFormController', {$scope: $scope, authService: authService});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.resetExpectations();
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

    it('should verify is signed in', function() {
      $scope.isSignedIn();
      expect(authService.isSignedIn).toHaveBeenCalled();
      expect($scope.isSignedIn()).toBe(true);
    });

    it('should logout', function() {
      spyOn($scope, 'signIn').and.callFake(function() {return true;});
      $scope.logout();
      expect(authService.logout).toHaveBeenCalled();
      expect($scope.signIn).toHaveBeenCalled();
    });

    it('should update from DB', function() {
      $httpBackend.whenGET('/admin/genres').respond(function(data) {
        return [200, ['Mexican', 'Thai']];
      });
      $httpBackend.whenGET('/admin/restaurants').respond(function(data) {
        return [200, [{_id: '12345', name: 'Chipotle'}, {_id: '67890', name: 'Noodle Place'}]];
      });
      $scope.updateFromDB();
      $httpBackend.flush();
      expect($scope.genres[0]).toBe('Mexican');
      expect($scope.genres[1]).toBe('Thai');
      expect($scope.restaurantList.length).toBe(2);
      expect($scope.restaurantNames[0]).toBe('Chipotle');
      expect($scope.restaurantNames[1]).toBe('Noodle Place');
    });

    it('should add a genre', function() {
      $scope.addGenre('Chinese');
      expect($scope.restaurant.genre[0]).toBe('Chinese');
      $scope.addGenre('Pizza');
      expect($scope.restaurant.genre[1]).toBe('Pizza');
      expect($scope.genre).toBe('');
    });

    it('should remove a genre', function() {
      $scope.addGenre('Italian');
      $scope.addGenre('Sandwiches');
      $scope.addGenre('Greek');
      expect($scope.restaurant.genre.length).toBe(3);
      expect($scope.restaurant.genre[0]).toBe('Italian');
      $scope.removeGenre(0);
      expect($scope.restaurant.genre.length).toBe(2);
      expect($scope.restaurant.genre[0]).toBe('Sandwiches');
      expect($scope.restaurant.genre[1]).toBe('Greek');
    });

    it('should add a menu item', function() {
      $scope.addMenuItem('Burgers');
      expect($scope.restaurant.menu_item[0]).toBe('Burgers');
      $scope.addMenuItem('French Fries');
      expect($scope.restaurant.menu_item[1]).toBe('French Fries');
      expect($scope.menu_item).toBe('');
    });

    it('should remove a menu item', function() {
      $scope.addMenuItem('Hot Dog');
      $scope.addMenuItem('Pretzel');
      $scope.addMenuItem('Cotton Candy');
      expect($scope.restaurant.menu_item.length).toBe(3);
      expect($scope.restaurant.menu_item[0]).toBe('Hot Dog');
      $scope.removeMenuItem(0);
      expect($scope.restaurant.menu_item.length).toBe(2);
      expect($scope.restaurant.menu_item[0]).toBe('Pretzel');
      expect($scope.restaurant.menu_item[1]).toBe('Cotton Candy');
    });

    it('should set price in dollar signs', function() {
      $scope.setPrice(2);
      expect($scope.restaurant.price).toBe(2);
      expect($scope.priceDollars).toBe('$$');
    });

    it('should clear form', function() {
      $scope.display_preview = true;
      $scope.restaurant = data.restaurantData;
      $scope.map = data.mapData;
      $scope.priceDollars = '$';
      expect($scope.restaurant.name).toBe('Cuban Place');
      expect($scope.restaurant.phone).toBe('+1 123-456-7890');
      expect($scope.restaurant.menu_item[0]).toBe('Cuban Roast');
      expect($scope.restaurant.hours.mon).toBe('10:00 am - 6:00 pm');
      expect($scope.restaurant.photos[0].caption).toBe('Cuban Sandwich');
      expect($scope.map.loc.lat).toBe('47.1234');
      $scope.clearForm();
      expect($scope.restaurant.name).toBe('');
      expect($scope.restaurant.phone).toBe('');
      expect(Array.isArray($scope.restaurant.menu_item)).toBe(true);
      expect($scope.restaurant.menu_item.length).toBe(0);
      expect($scope.restaurant.hours.mon).toBe('');
      expect(Array.isArray($scope.restaurant.photos)).toBe(true);
      expect($scope.restaurant.photos.length).toBe(0);
      expect($scope.map.loc.lat).toBe('');
      expect($scope.priceDollars).toBe('');
      expect($scope.display_preview).toBe(false);
    });

    it('should populate address', function() {
      $scope.details = details;
      $scope.populateAddress();
      expect($scope.restaurant.name).toBe('Paseo Caribbean Restaurant');
      expect($scope.restaurant.phone).toBe('+1 206-545-7440');
      expect($scope.restaurant.hours.mon).toBe('Closed');
      expect($scope.map.loc.lat).toBe(47.658506);
      expect($scope.priceDollars).toBe('$$');
      expect($scope.display_preview).toBe(true);
      expect($scope.editing).toBe(false);
    });

    it('should submit form for save and edit', function() {
      $scope.r_id = 'abc123efg';
      spyOn($scope, 'handleResponse');
      $httpBackend.whenPOST('/admin/restaurants').respond(function(data) {
        return [200, {msg: 'save successful'}];
      });
      $httpBackend.whenPUT('/admin/restaurants/' + $scope.r_id).respond(function(data) {
        return [200, {msg: 'update successful'}];
      });
      $scope.details = details;
      $scope.populateAddress();
      $scope.submitForm();
      $httpBackend.flush();
      expect($scope.handleResponse.calls.count()).toBe(1);
      expect($scope.handleResponse.calls.argsFor(0)[1].msg).toBe('save successful');
      expect($scope.editing).toBe(false);
      $scope.editing = true;
      $scope.submitForm();
      $httpBackend.flush();
      expect($scope.handleResponse.calls.count()).toBe(2);
      expect($scope.handleResponse.calls.mostRecent().args[1].msg).toBe('update successful');
      expect($scope.editing).toBe(false);
    });
  });
});
