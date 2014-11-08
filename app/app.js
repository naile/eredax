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
    moment.locale('sv', {
      relativeTime : {
          future : '%s',
          past : 'Nu',
          s : 'Nu',
          m : '1 min',
          mm : '%d min',
          h : 'en timme',
          hh : '%d timmar',
          d : 'en dag',
          dd : '%d dagar',
          M : 'en månad',
          MM : '%d månader',
          y : 'ett år',
          yy : '%d år'
      },
    })
});