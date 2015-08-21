'use strict';

module.exports = function(app) {
  app.service('modalService', ['$modal', function ($modal) {
    var modalDefaults = {
      backdrop: true,
      keyboard: true,
      modalFade: true,
      controller: 'modalInstanceController'
    };

    this.showModal = function (customModalDefaults) {
      if (!customModalDefaults) customModalDefaults = {};
      customModalDefaults.backdrop = 'static';
      return this.show(customModalDefaults);
    };

    this.show = function (customModalDefaults) {
      var tempModalDefaults = {};

      //Map angular-ui modal custom defaults to modal defaults defined in service
      angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

      return $modal.open(tempModalDefaults).result;
    };

  }]);
};
