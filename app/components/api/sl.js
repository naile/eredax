'use strict';

var dataServices = angular.module('eredax.dataServices', []);

dataServices.factory('SLApi', ['$http', function ($http) {

  var self = {};
  self.apiUrl = '/api/realtimedepartures.json?'
  self.get = get;

  function get(siteid, timeWindow) {
    return $http.get(queryUrl(siteid, timeWindow))
      .then(function (result) {
        if (result.status !== 200 || result.data.StatusCode !== 0) {
          return null;
        }
        setMomentTime(result.data.ResponseData.Trains);
        setMomentTime(result.data.ResponseData.Buses);
        setMomentTime(result.data.ResponseData.Trams);
        countDeviations(result.data.ResponseData.Trains);
        countDeviations(result.data.ResponseData.Buses);
        countDeviations(result.data.ResponseData.Trams);
        return result.data.ResponseData
      });
  }

  function queryUrl(siteid, timeWindow) {
    return self.apiUrl + 'siteid=' + siteid + '&TimeWindow=' + timeWindow;
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

  return self;
}]);