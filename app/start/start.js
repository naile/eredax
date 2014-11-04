'use strict';

angular.module('eredax.start', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'start/start.html',
    controller: 'StartCtrl'
  });
}])

.controller('StartCtrl', ['$scope', 'Data', function(sc, Data) {

  sc.$on('newList', function(ev, data) {
    console.log(data);
    sc.trains = data.ResponseData.Trains;
    sc.buses = data.ResponseData.Buses;
    sc.latestUpdate = data.ResponseData.LatestUpdate;
  });

  sc.DataAgeActual = 32;
  sc.limit = 5;
  
  sc.DataAgeActual = function(){
    //TODO: Compare LatestUpdate with current datetime
    //and return difference in human readable format - moment.js?
    return sc.LatestUpdate;
  }
}]);