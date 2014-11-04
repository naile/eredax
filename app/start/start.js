'use strict';

angular.module('eredax.start', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'start/start.html',
    controller: 'StartCtrl'
  });
}])

.controller('StartCtrl', ['$scope','$http', 'Data', function(sc,http,Data) {

  Data.query.then(function(data){
    sc.trains = data.ResponseData.Trains;
    sc.buses = data.ResponseData.Buses;
    sc.latestUpdate = data.ResponseData.LatestUpdate;
  }, function(error){
    sc.error = error;
  });

  sc.DataAgeActual = 32;
  
  sc.DataAgeActual = function(){
    //TODO: Compare LatestUpdate with current datetime
	//and return difference in human readable format - moment.js?
	return sc.LatestUpdate();
  }
}]);