'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('clear fields service', function() {
  var clearFieldsService;
  var testobj;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function(_clearFieldsService_) {
    clearFieldsService = _clearFieldsService_;
  }));

  beforeEach(function() {
    testobj = {
      arr: [1,2,3,4,5],
      fun: function() {return 'So Cool';},
      obj: {test: 'foo'},
      str: 'Hello World'
    };
  });

  it('should empty keys in the object', function() {
    var emptyobj = clearFieldsService(testobj);
    expect(Array.isArray(emptyobj.arr)).toBe(true);
    expect(emptyobj.arr.length).toBe(0);
    expect(typeof emptyobj.fun).toBe('string');
    expect(emptyobj.fun).toBe('');
    expect(typeof emptyobj.obj).toBe('object');
    expect(Object.keys(emptyobj.obj).length).toBe(1);
    expect(emptyobj.obj.test).toBe('');
    expect(typeof emptyobj.str).toBe('string');
    expect(emptyobj.str).toBe('');
  });

});