'use strict';

var dataServices = angular.module('eredax.dataServices', []);

dataServices.factory('Data', ['$http', '$interval', '$rootScope', 'Config', function ($http, $interval, $rootScope, Config) {

  var self = {};
  var apiUrl = '/api/realtimedepartures.json?'
  var query = "";

  function refresh(url) {
    $http.get(url).success(function (data) {
      //console.log('dataserviced fetched new data');
      self.latest = data;
      setMomentTime(self.latest.ResponseData.Trains);
      setMomentTime(self.latest.ResponseData.Buses);
      setMomentTime(self.latest.ResponseData.Trams);
      countDeviations(self.latest.ResponseData.Trains);
      countDeviations(self.latest.ResponseData.Buses);
      countDeviations(self.latest.ResponseData.Trams);
      $rootScope.$broadcast('newList', self.latest);
    });
  }

  function queryUrl(siteid, timeWindow) {
    return apiUrl + 'siteid=' + siteid + '&TimeWindow=' + timeWindow;
  }

  function setMomentTime(collection) {
    if (collection == null) return;
    for (var i = 0; i < collection.length; i++) {
      collection[i].ExpectedDateTimeMoment = moment(collection[i].ExpectedDateTime);
    }
  }

  function countDeviations(collection) {
    //TODO: use array.map instead
    if (collection == null) return;
    var deviations = 0;
    for (var i = 0; i < collection.length; i++) {
      deviations += collection[i].Deviations == null
        ? 0
        : collection[i].Deviations.length;
    }
    collection.DevationCount = deviations;
  }

  Config.getConfig().then(function (result) {
    var siteid = result.startStation.id;
    var timeWindow = result.timeWindow;

    self.queryUrl = queryUrl(siteid, timeWindow);
    self.limit = result.maxItemsPerList;

    self.interval = $interval(function () {
      refresh(self.queryUrl);
    }, result.updateInterval * 1000);

    refresh(self.queryUrl);
  })

  return self;
}]);