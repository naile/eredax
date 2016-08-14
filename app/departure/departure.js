'use strict';

angular.module('eredax.departure', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:stationId', {
    templateUrl: 'departure/departure.html',
    controller: 'DepartureCtrl'
  });
}])

.controller('DepartureCtrl', ['$scope', '$interval', 'SLApi', function(sc, interval, SLApi) {
  sc.latestUpdate = moment();

  function updateDepartures(departures) {
    sc.latestUpdate = moment(departures.LatestUpdate);
    sc.stopDeviations = departures.StopPointDeviations;
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

  sc.ageInterval = interval(function () {
    sc.dataAge = sc.latestUpdate == null ? -1 : moment().diff(sc.latestUpdate, 'seconds');
  }, 1 * 1000);

  sc.$on('$destroy', function() {
    if (angular.isDefined(sc.ageInterval)){
      interval.cancel(sc.ageInterval)
      sc.ageInterval = undefined;
    }
  });

}]);