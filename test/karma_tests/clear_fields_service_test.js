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
      one: [{a: 'b'}, {c: 'd'}],
      two: {e: 1, f: 2, g: 3},
      three: [1, 2, 3, 4, 5, 6],
      four: [
        {a1: ['a', 'b', 'c', 'd']},
        {a2: [{one: 1, two: 2}]},
        {a3: {b3: [1, 2, 3, 4]}}
      ],
      five: 'five',
      six: 6
    };
  });

  it('should empty keys in the object', function() {
    var emptyobj = clearFieldsService(testobj);
    expect(emptyobj.one[0].a).toBe('');
    expect(emptyobj.one[1].c).toBe('');
    expect(emptyobj.two.e).toBe(0);
    expect(emptyobj.two.f).toBe(0);
    expect(emptyobj.two.g).toBe(0);
    expect(emptyobj.three.length).toBe(0);
    expect(emptyobj.four[0].a1.length).toBe(0);
    expect(emptyobj.four[1].a2[0].one).toBe(0);
    expect(emptyobj.four[1].a2[0].two).toBe(0);
    expect(emptyobj.four[2].a3.b3.length).toBe(0);
    expect(emptyobj.five).toBe('');
    expect(emptyobj.six).toBe(0);
  });

});
