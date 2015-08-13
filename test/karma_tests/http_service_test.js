'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('http service', function() {
  var httpService;
  var $httpBackend;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function(_httpService_, _$httpBackend_) {
    httpService = _httpService_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be a service', function() {
    expect(typeof httpService('api').getOne).toBe('function');
    expect(typeof httpService('api').getAll).toBe('function');
    expect(typeof httpService('api').create).toBe('function');
    expect(typeof httpService('api').save).toBe('function');
    expect(typeof httpService('api').remove).toBe('function');
  });

});
