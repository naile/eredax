'use strict';

var dataServices = angular.module('eredax.dataServices', []);

dataServices.factory('Data', ['$http', '$interval', '$rootScope', 'Config', function($http, $interval, $rootScope, Config) {

  var self = {};
  var apiUrl = '/api2/realtimedepartures.json?'
  var query = "";

  function refresh(url) {
    $http.get(url).success(function(data) {
      //console.log('dataserviced fetched new data');
      $rootScope.$broadcast('newList', data);
    });
  }

  Config.getConfig().then(function(result) {
  	console.log(result);

    var siteid = result.stations[0].id;
    var timeWindow = result.timeWindow;
    self.queryUrl = apiUrl + 'key=' + result.apikeys.sl_realtid + '&siteid=' + siteid + '&TimeWindow=' + timeWindow;

    self.interval = $interval(function(){
      refresh(self.queryUrl);
    }, result.updateInterval * 1000);

    refresh(self.queryUrl);
  })

  

  return self;
}]);