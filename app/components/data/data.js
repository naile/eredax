'use strict';

var dataServices = angular.module('eredax.dataServices', []);

dataServices.factory('Data', ['$http', function($http){

  var self = {};
  self.query = $http.get('/mockdata.json').
  success(function(data, status, headers, config) {
    self.rawData = data;
  });
  return self;
}]);