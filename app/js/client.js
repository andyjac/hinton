'use strict';

require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
require('ng-autocomplete');
require('angular-bootstrap');

// Application
var hintonAdminApp = angular.module('hintonAdminApp', ['ngRoute', 'base64', 'ngCookies', 'ngAutocomplete', 'ui.bootstrap']);

// Services
require('./auth/auth_service')(hintonAdminApp);
require('./services/clear_fields_service')(hintonAdminApp);
require('./services/http_service')(hintonAdminApp);
require('./services/restaurant_service')(hintonAdminApp);
require('./services/google_places_service')(hintonAdminApp);
require('./services/modal_service')(hintonAdminApp);

// Controllers
require('./auth/auth_controller')(hintonAdminApp);
require('./controllers/restaurant_form_controller')(hintonAdminApp);
require('./controllers/modal_instance_controller')(hintonAdminApp);

// Directives
require('./directives/dropdown_directive')(hintonAdminApp);
require('./directives/input_field_directive')(hintonAdminApp);
require('./directives/autofocus_directive')(hintonAdminApp);

// View Routes
hintonAdminApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/restaurant_form.html',
      controller: 'restaurantFormController'
    })
    .when('/sign_in', {
      templateUrl: 'templates/views/sign_in.html',
      controller: 'authController'
    })
    .when('/create_user', {
      templateUrl: 'templates/views/create_user.html',
      controller: 'authController'
    })
    .otherwise({ redirectTo: '/' });
}]);
