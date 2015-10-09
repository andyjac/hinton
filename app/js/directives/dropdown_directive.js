module.exports = function(app) {
  app.directive('dropdownDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/dropdown.html',
      scope: {
        containerClass: '@',
        buttonId: '@',
        buttonText: '@',
        ulId: '@',
        items: '=',
        select: '&',
        maxlen: '@'
      },
      controller: function($element) {
        var vm = this;
        var maxRows = 12;
        var rows = (parseInt(vm.maxlen) || maxRows);
        vm.numcols = function() {
          return Math.ceil(vm.items.length / rows);
        };
      },
      controllerAs: 'vm',
      bindToController: true
    };
  });
};
