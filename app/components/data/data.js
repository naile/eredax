'use strict';

var dataServices = angular.module('eredax.dataServices', []);

dataServices.factory('Data', ['$http', '$interval', '$rootScope', function($http, $interval, $rootScope){

  var self = {};

  function refresh(url) {
    $http.get(url).success(function(data) {
      console.log('dataserviced fetched new data');
      $rootScope.$broadcast('newList', data);
    });
  }

  var interval = $interval(function(){
    refresh('mockdata.json');
  }, 60 * 1000);

  refresh('mockdata.json');
  return self;
}]);