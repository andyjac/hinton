'use strict';

require('angular/angular');
require('angular-route');

// application
var hintonAdminApp = angular.module('hintonAdminApp', ['ngRoute']);

// controllers
require('./controllers/restaurant_form_controller')(hintonAdminApp);

// routes
hintonAdminApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/restaurant_form.html',
      controller: 'restaurantFormController'
    })
    .otherwise({ redirectTo: '/' });
}]);
