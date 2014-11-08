'use strict';

var dataServices = angular.module('eredax.dataServices', []);

dataServices.factory('Data', ['$http', '$interval', '$rootScope', 'Config', function($http, $interval, $rootScope, Config) {

  var self = {};
  var apiUrl = '/api2/realtimedepartures.json?'
  var query = "";

  function refresh(url) {
    $http.get(url).success(function(data) {
      //console.log('dataserviced fetched new data');
      self.latest = data;
      setMomentTime(self.latest.ResponseData.Trains);
      setMomentTime(self.latest.ResponseData.Buses);
      setMomentTime(self.latest.ResponseData.Trams);
      $rootScope.$broadcast('newList', self.latest);
    });
  }

  function queryUrl (apikey, siteid, timeWindow)
  {
    return apiUrl + 'key=' + apikey + '&siteid=' + siteid + '&TimeWindow=' + timeWindow;
  }

  function setMomentTime(collection) {
    if(collection == null) return;
    for(var i = 0; i < collection.length; i++) {
      collection[i].ExpectedDateTimeMoment = moment(collection[i].ExpectedDateTime);
    }
  }

  Config.getConfig().then(function(result) {
  	var siteid = result.stations[0].id;
    var apikey = result.apikeys.sl_realtid;
    var timeWindow = result.timeWindow;

    self.queryUrl = queryUrl(apikey, siteid, timeWindow);
    self.limit = result.maxItemsPerList;

    self.interval = $interval(function() {
      refresh(self.queryUrl);
    }, result.updateInterval * 1000);

    refresh(self.queryUrl);
  })

  return self;
}]);