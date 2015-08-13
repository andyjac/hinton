'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('restaurant service', function() {
  var restaurantService;
  var restaurantData;
  var mapData;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function(_restaurantService_) {
    restaurantService = _restaurantService_;
  }));

  beforeEach(function() {
    restaurantData = {
      name: 'Chipotle',
      genre: ['Mexican', 'Fast Casual'],
      phone: '123-456-7890',
      price: 1,
      p_id: 'gid1234',
      address: { number: '1000', street: 'Pike', city: 'Seattle', state: 'WA', zip: '98101', country: 'USA' },
      menu_item: ['Tacos'],
      blog_link: 'blog.com',
      r_site: 'chipotle.com',
      menu_link: 'chipotle.com/menu',
      hours: { mon: '8am - 8pm', tue: '8am - 8pm', wed: '8am - 8pm', thu: '8am - 8pm', fri: '8am - 8pm', sat: '8am - 8pm', sun: '8am - 8pm' },
    };
    mapData = {
      loc: { lat: '50.00', long: '-100.00' },
      caption: 'Chipotle'
    };
  });

  it('should be a service', function() {
    expect(typeof restaurantService.restaurantData).toBe('function');
    expect(typeof restaurantService.mapData).toBe('function');
    expect(typeof restaurantService.genres).toBe('function');
    expect(typeof restaurantService.restaurantList).toBe('function');
    expect(typeof restaurantService.restaurantNames).toBe('function');
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

});
