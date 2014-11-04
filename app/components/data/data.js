'use strict';

var dataServices = angular.module('eredax.dataServices', []);

dataServices.factory('Data', ['$http', '$interval', '$rootScope', 'Config', function($http, $interval, $rootScope, Config) {

  var self = {};
  var apiUrl = '/api2/realtimedepartures.json?'
  var query = apiUrl + 'key=' + self.apikeys.sl_realtid + '&siteid=' + self.siteid + '&TimeWindow=' + 60;

  function refresh(url) {
    $http.get(url).success(function(data) {
      //console.log('dataserviced fetched new data');
      $rootScope.$broadcast('newList', data);
    });
  }

  Config.getConfig().then(function(result) {
    self.apikeys = result.apikeys;
    self.siteid = result.stations[0].id;
    self.interval = $interval(function(){
      refresh();
    }, 60 * 1000);

  refresh('mockdata.json');
  })
  return self;
}]);