'use strict';

angular.module('eredax.departure', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:stationId', {
    templateUrl: 'departure/departure.html',
    controller: 'DepartureCtrl'
  });
}])

.controller('DepartureCtrl', ['$scope', '$interval', 'SLApi', 'Config', '$routeParams', function (sc, interval, SLApi, Config, params) {
  sc.latestUpdate = moment();
  var config = {};
  Config.getConfig()
    .then(function (result) {
      config = result;
      sc.realtimeInterval = interval(function () {
        getDepartures();
      }, config.updateInterval * 1000)
      getDepartures();
    });

  function updateDepartures(departures) {
    sc.latestUpdate = moment(departures.LatestUpdate);
    sc.stopDeviations = mapDeviations(departures.StopPointDeviations);
    sc.trains = departures.Trains;
    sc.buses = departures.Buses;
    sc.trainLimit = SLApi.limit - departures.Trains.DevationCount;
    sc.busLimit = SLApi.limit - departures.Buses.DevationCount;
  }

  function getDepartures() {
    SLApi.get(params.stationId, config.timeWindow)
      .then(function (departures) {
        if(departures !== null)
          updateDepartures(departures)
      })
  }

  function mapDeviations(deviations) {
    return deviations ?
      deviations.map(function (el) { return el.Deviation.Text }).join(' ')
      : undefined
  }

  sc.showMoment = function (time) {
    return moment().diff(time, 'minutes') < -30 ? false : true;
  };

  sc.ageInterval = interval(function () {
    sc.dataAge = sc.latestUpdate == null ? -1 : moment().diff(sc.latestUpdate, 'seconds');
  }, 1 * 1000);

  sc.$on('$destroy', function () {
    if (angular.isDefined(sc.ageInterval)) {
      interval.cancel(sc.ageInterval)
      sc.ageInterval = undefined;
    }
    if (angular.isDefined(sc.realtimeInterval)) {
      interval.cancel(sc.realtimeInterval)
      sc.realtimeInterval = undefined;
    }
  });

}]);