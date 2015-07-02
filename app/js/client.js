'use strict';

require('angular/angular');
require('ng-autocomplete');

var hintonApp = angular.module('hintonApp', ['ngAutocomplete']);

//Services

//Controllers
require('./admin/controllers/admin_controller.js')(hintonApp);

//Directives

