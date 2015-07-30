'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('auth service', function() {
  var auth;
  var $httpBackend;
  var $cookies;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function(_auth_, _$httpBackend_, _$cookies_) {
    auth = _auth_;
    $httpBackend = _$httpBackend_;
    $cookies = _$cookies_;
  }));

  it('should create user', function() {
    var user = {username: 'test@example.com', email: 'test@example.com', password: 'foo'};
    $httpBackend.expectPOST('/hinton/user/create_user/client').respond(200, {token: 'gentokenkey'});
    auth.create(user, function() {});
    $httpBackend.flush();
    expect($cookies.get('eat')).toBe('gentokenkey');
  });

  it('should sign in user', function() {
    var user = {username: 'test2@example.com', email: 'test2@example.com', password: 'foo2'};
    $httpBackend.expectGET('/hinton').respond(200, {token: 'gentokenkey2'});
    auth.signIn(user, function() {});
    $httpBackend.flush();
    expect($cookies.get('eat')).toBe('gentokenkey2');
  });

  it('should verify user is signed in', function() {
    $cookies.put('eat', 'a1b2c3d4');
    expect(auth.isSignedIn()).toBe(true);
  });

  it('should verify user not signed in', function() {
    $cookies.put('eat', '');
    expect(auth.isSignedIn()).toBe(false);
  });
});
