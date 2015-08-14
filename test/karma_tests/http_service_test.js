'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('http service', function() {
  var httpService;
  var $httpBackend;
  var $cookies;
  var $http;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function(_httpService_, _$httpBackend_, _$cookies_) {
    httpService = _httpService_;
    $httpBackend = _$httpBackend_;
    $cookies = _$cookies_;
  }));

  it('should be a service', function() {
    expect(typeof httpService('api').getOne).toBe('function');
    expect(typeof httpService('api').getAll).toBe('function');
    expect(typeof httpService('api').create).toBe('function');
    expect(typeof httpService('api').save).toBe('function');
    expect(typeof httpService('api').remove).toBe('function');
  });

  it('should not send token if none is set', function() {
    $httpBackend.expectGET('/admin/hinton', function(headers) {
      expect(headers['eat']).toBe(''); //jshint ignore:line
      return !headers.Authorization;
    }).respond(200);
    httpService('hinton').getAll(function(){});
    $httpBackend.flush();
  });

  it('should send token in header', function() {
    $cookies.put('eat', 'token123');
    $httpBackend.expectGET('/admin/hinton', function(headers) {
      expect(headers['eat']).toBe('token123'); //jshint ignore:line
      return !headers.Authorization;
    }).respond(200);
    httpService('hinton').getAll(function(){});
    $httpBackend.flush();
  });

});
