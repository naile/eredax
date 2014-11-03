'use strict';

angular.module('eredax.start', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'start/start.html',
    controller: 'StartCtrl'
  });
}])

.controller('StartCtrl', ['$scope','$http', 'Data', function(sc,http,Data) {

  sc.LatestUpdate = "2014-11-03T21:04:03"
  sc.DataAge = 32;
  sc.trains = mockTrains();
  sc.DataAgeActual = function(){
    //TODO: Compare LatestUpdate with current datetime
	//and return difference in human readable format - moment.js?
	return sc.LatestUpdate();
  }
  sc.Data = Data.rawData;
  console.log(sc.Data);
}]);

function mockTrains()
{
  return [
    { "Destination": "Bålsta",
	  "DisplayTime": "Nu",
	  "LineNumber": "35" },
    { "Destination": "Västerhaninge",
	  "DisplayTime": "4 min",
	  "LineNumber": "35" },
    { "Destination": "Bålsta",
	  "DisplayTime": "8 min",
	  "LineNumber": "35" },
  ];
}