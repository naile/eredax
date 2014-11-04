'use strict';

var dataServices = angular.module('eredax.dataServices', []);

dataServices.factory('Data', ['$http', '$q', function($http, $q){

  var self = {};
  var deferred = $q.defer();
  $http.get('mockdata.json').success(function(data) {
  	console.log('dataserviced fetched new data');
  	    console.log(data);
    deferred.resolve(data);
  });

  self.query = deferred.promise;
  return self;
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