'use strict';

require('../../app/js/client');
require('angular-mocks');
var details = require('./google_places_details');

describe('google places service', function() {
  var googlePlacesService;
  var restaurantData;
  var mapData;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function(_googlePlacesService_) {
    googlePlacesService = _googlePlacesService_;
    restaurantData = {
      name: '',
      genre: [],
      phone: '',
      price: 0,
      p_id: '',
      address: { number: '', street: '', city: '', state: '', zip: '', country: '' },
      menu_item: [],
      blog_link: '',
      r_site: '',
      menu_link: '',
      hours: { mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' },
    };
    mapData = {
      loc: { lat: '', long: '' },
      caption: ''
    };
  }));

  it('should be a service', function() {
    expect(typeof googlePlacesService.populateInfo).toBe('function');
  });

  it('should return restaurant data', function() {
    var populated = googlePlacesService.populateInfo(details, restaurantData, mapData);
    expect(populated.restaurant.name).toBe('Paseo Caribbean Restaurant');
    expect(populated.restaurant.phone).toBe('+1 206-545-7440');
    expect(populated.restaurant.price).toBe(2);
    expect(populated.restaurant.p_id).toBe('ChIJI9abTFMUkFQRjkoqvmG4eWY');
    expect(populated.restaurant.address.number).toBe('4225');
    expect(populated.restaurant.address.street).toBe('Fremont Ave N');
    expect(populated.restaurant.address.city).toBe('Seattle');
    expect(populated.restaurant.address.state).toBe('WA');
    expect(populated.restaurant.address.zip).toBe('98103');
    expect(populated.restaurant.address.country).toBe('United States');
    expect(populated.restaurant.r_site).toBe('http://www.paseoseattle.com/');
    expect(populated.restaurant.hours.mon).toBe('Closed');
    expect(populated.restaurant.hours.tue).toBe('11:00 am – 9:00 pm');
    expect(populated.restaurant.hours.wed).toBe('11:00 am – 9:00 pm');
    expect(populated.restaurant.hours.thu).toBe('11:00 am – 9:00 pm');
    expect(populated.restaurant.hours.fri).toBe('11:00 am – 9:00 pm');
    expect(populated.restaurant.hours.sat).toBe('11:00 am – 8:00 pm');
    expect(populated.restaurant.hours.sun).toBe('Closed');
  });

  it('should return map data', function() {
    var populated = googlePlacesService.populateInfo(details, restaurantData, mapData);
    expect(populated.map.loc.lat).toBe(47.658506);
    expect(populated.map.loc.long).toBe(-122.35033099999998);
    expect(populated.map.caption).toBe('Paseo Caribbean Restaurant');
  });
});
