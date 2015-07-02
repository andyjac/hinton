'use strict';

require('angular/angular');
require('angular-route');
require('ng-autocomplete');

// Application
var hintonAdminApp = angular.module('hintonAdminApp', ['ngRoute', 'ngAutocomplete']);

//Services

// Controllers
require('./controllers/restaurant_form_controller')(hintonAdminApp);

//Directives

// View Routes
hintonAdminApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/restaurant_form.html',
      controller: 'restaurantFormController'
    })
    .otherwise({ redirectTo: '/' });
}]);
