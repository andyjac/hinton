'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('modal service', function() {
  var modalService;
  var $modal;

  beforeEach(angular.mock.module('hintonAdminApp'));

  beforeEach(angular.mock.inject(function(_modalService_, _$modal_) {
    modalService = _modalService_;
    $modal = _$modal_;
  }));

  it('should be a service', function(){
    expect(typeof modalService.showModal).toBe('function');
    expect(typeof modalService.show).toBe('function');
  });
});
