'use strict';

angular.module('eredax.start', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/start', {
      template: '',
      controller: 'StartCtrl'
    });
  }])

  .controller('StartCtrl', ['Config', '$location', function (Config, $location) {
    Config.getConfig().then(function (config) {
      $location.path('/' + config.startStation.id);
    })
  }]);