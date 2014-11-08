'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('eredax', [
  'ngRoute',
  'eredax.start',
  'eredax.version',
  'eredax.dataServices',
  'eredax.configuration',
  'angularMoment'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/start'});
}]);

app.run(function(amMoment) {
    amMoment.changeLocale('sv');
});