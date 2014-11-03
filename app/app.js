'use strict';

// Declare app level module which depends on views, and components
angular.module('eredax', [
  'ngRoute',
  'eredax.start',
  'eredax.view2',
  'eredax.version',
  'eredax.dataServices'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/start'});
}]);
