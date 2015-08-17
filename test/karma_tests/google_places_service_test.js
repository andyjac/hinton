'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('google places service', function() {
  var googlePlacesService;
  var details;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function(_googlePlacesService_) {
    googlePlacesService = _googlePlacesService_;

  }));

  it('should be a service', function() {
    expect(typeof googlePlacesService.populateInfo).toBe('function');
  });

});
