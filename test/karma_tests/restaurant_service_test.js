'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('restaurant service', function() {
  var restaurantService;
  var restaurantData;
  var mapData;
  var $httpBackend;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function(_restaurantService_, _$httpBackend_) {
    restaurantService = _restaurantService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.resetExpectations();
  });

  it('should be a service', function() {
    expect(typeof restaurantService.restaurantData).toBe('function');
    expect(typeof restaurantService.mapData).toBe('function');
    expect(typeof restaurantService.genres).toBe('function');
    expect(typeof restaurantService.restaurantList).toBe('function');
    expect(typeof restaurantService.restaurantNames).toBe('function');
    expect(typeof restaurantService.restaurantData()).toBe('object');
    expect(typeof restaurantService.mapData()).toBe('object');
    expect(Array.isArray(restaurantService.genres())).toBe(true);
    expect(Array.isArray(restaurantService.restaurantList())).toBe(true);
    expect(Array.isArray(restaurantService.restaurantNames())).toBe(true);
  });

  it('should add a genre', function() {
    restaurantService.addGenre('Fast Food');
    expect(restaurantService.restaurantData().genre[0]).toBe('Fast Food');
  });

  it('should remove a genre', function() {
    restaurantService.addGenre('Thai');
    expect(restaurantService.restaurantData().genre.length).toBe(1);
    restaurantService.removeGenre(0);
    expect(restaurantService.restaurantData().genre.length).toBe(0);
  });

  it('should add a menu item', function() {
    restaurantService.addMenuItem('Burgers');
    expect(restaurantService.restaurantData().menu_item[0]).toBe('Burgers');
  });

  it('should remove a menu item', function() {
    restaurantService.addMenuItem('Tacos');
    expect(restaurantService.restaurantData().menu_item.length).toBe(1);
    restaurantService.removeMenuItem(0);
    expect(restaurantService.restaurantData().menu_item.length).toBe(0);
  });

  it('should set price', function() {
    restaurantService.setPrice(2);
    expect(restaurantService.restaurantData().price).toBe(2);
  });

  it('should get all genres', function() {
    $httpBackend.whenGET('/admin/genres').respond(function(data) {
      return [200, ['Mexican', 'Thai']];
    });
    restaurantService.getAllGenres(function(){});
    $httpBackend.flush();
    expect(restaurantService.genres()[0]).toBe('Mexican');
    expect(restaurantService.genres()[1]).toBe('Thai');
  });

  it('should get all restaurants', function() {
    $httpBackend.whenGET('/admin/restaurants').respond(function(data) {
      return [200, [{_id: '12345', name: 'Chipotle'}, {_id: '67890', name: 'Noodle Place'}]];
    });
    restaurantService.getAllRestaurants(function(){});
    $httpBackend.flush();
    console.log(restaurantService.restaurantList());
    expect(restaurantService.restaurantList().length).toBe(2);
    expect(restaurantService.restaurantList()[0]._id).toBe('12345');
    expect(restaurantService.restaurantList()[1]._id).toBe('67890');
    expect(restaurantService.restaurantNames()[0]).toBe('Chipotle');
    expect(restaurantService.restaurantNames()[1]).toBe('Noodle Place');
  });
});
