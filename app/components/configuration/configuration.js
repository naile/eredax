'use strict';

var configService = angular.module('eredax.configuration', []);

configService.factory('Config', ['$http', function($http) {

  var getConfig = function() {
    return $http.get('app.conf.json', {cache: true}).then(function(result) {
      console.log('configuration fetched data');
      console.log(result);
      return result.data;
    });
  };
  return { getConfig: getConfig };
}]);