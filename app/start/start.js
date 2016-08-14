'use strict';

angular.module('eredax.start', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'start/start.html',
    controller: 'StartCtrl'
  });
}])

.controller('StartCtrl', ['$scope', '$interval', 'SLApi', function(sc, interval, SLApi) {
  sc.latestUpdate = moment();

  function updateDepartures(departures) {
    sc.latestUpdate = moment(departures.LatestUpdate);
    sc.trains = departures.Trains;
    sc.buses = departures.Buses;
    sc.trainLimit = SLApi.limit - departures.Trains.DevationCount;
    sc.busLimit = SLApi.limit - departures.Buses.DevationCount;
  }

  sc.showMoment = function (time) {
    return moment().diff(time, 'minutes') < -30 ? false : true;
  };

  sc.$on('newList', function(ev, data) {
    updateDepartures(data.ResponseData);
  });

  sc.interval = interval(function () {
    sc.dataAge = sc.latestUpdate == null ? -1 : moment().diff(sc.latestUpdate, 'seconds');
  }, 1 * 1000);

}]);