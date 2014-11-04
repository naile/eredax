'use strict';

// Declare app level module which depends on views, and components
angular.module('eredax', [
  'ngRoute',
  'eredax.start',
  'eredax.version',
  'eredax.dataServices',
  'eredax.configuration'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/start'});
}]);
