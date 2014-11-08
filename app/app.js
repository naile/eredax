'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('eredax', [
  'ngRoute',
  'eredax.page',
  'eredax.start',
  'eredax.version',
  'eredax.dataServices',
  'eredax.pageService',
  'eredax.configuration',
  'angularMoment'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/start'});
}]);

app.run(function(amMoment) {
    amMoment.changeLocale('sv');
});