'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('auth service', function() {
  var authService;
  var $httpBackend;
  var $cookies;
  var $location;
  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function(_authService_, _$httpBackend_, _$cookies_, _$location_) {
    authService = _authService_;
    $httpBackend = _$httpBackend_;
    $cookies = _$cookies_;
    $location = _$location_;
  }));

  it('should create user', function() {
    var user = {username: 'test@example.com', email: 'test@example.com', password: 'foo'};
    $httpBackend.expectPOST('/admin/create_user').respond(200, {token: 'gentokenkey'});
    authService.create(user, function() {});
    $httpBackend.flush();
    expect($cookies.get('eat')).toBe('gentokenkey');
  });

  it('should sign in user', function() {
    var user = {username: 'test2@example.com', email: 'test2@example.com', password: 'foo2'};
    $httpBackend.expectGET('/admin/sign_in').respond(200, {token: 'gentokenkey2'});
    authService.signIn(user, function() {});
    $httpBackend.flush();
    expect($cookies.get('eat')).toBe('gentokenkey2');
  });

  it('should verify user is signed in', function() {
    $cookies.put('eat', 'a1b2c3d4');
    expect(authService.isSignedIn()).toBe(true);
  });

  it('should verify user not signed in', function() {
    $cookies.put('eat', '');
    expect(authService.isSignedIn()).toBe(false);
  });

  it('should logout user', function() {
    $cookies.put('eat', 'a1b2c3d4e5');
    authService.logout();
    expect($cookies.get('eat')).toBe('');
    expect($cookies.get('eat').length).toBe(0);
    expect($location.path()).toBe('/sign_in');
  });
});
