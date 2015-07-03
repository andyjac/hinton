'use strict';

require('angular/angular');
require('angular-route');
require('ng-autocomplete');
require('angular-bootstrap');

// Application
var hintonAdminApp = angular.module('hintonAdminApp', ['ngRoute', 'ngAutocomplete', 'ui.bootstrap']);

//Services

// Controllers
require('./controllers/restaurant_form_controller')(hintonAdminApp);
require('./controllers/dropdown_controller')(hintonAdminApp);
require('./controllers/timepicker_controller')(hintonAdminApp);

//Directives
require('./directives/dropdown_directive')(hintonAdminApp);

// View Routes
hintonAdminApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/restaurant_form.html',
      controller: 'restaurantFormController'
    })
    .otherwise({ redirectTo: '/' });
}]);
