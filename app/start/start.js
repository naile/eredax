'use strict';

angular.module('eredax.start', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'start/start.html',
    controller: 'StartCtrl'
  });
}])

.controller('StartCtrl', ['$scope', '$interval', 'Data', function(sc, interval, Data) {
  function setData(data) {
    sc.latestUpdate = moment(data.ResponseData.LatestUpdate);
    sc.trains = data.ResponseData.Trains;
    sc.buses = data.ResponseData.Buses;
    sc.limit = Data.limit;
  }

  sc.updateDataAge = function dataAge() {
    sc.dataAge = sc.latestUpdate == null ? -1 : moment().diff(sc.latestUpdate, 'seconds');
    //console.log(sc.dataAge);
  }

  sc.showMoment = function(time) {
    return moment().diff(time, 'minutes') < -30 ? false : true;
  };

  sc.$on('newList', function(ev, data) {
    setData(data);
  });

  sc.interval = interval(function() {
    sc.updateDataAge();
  }, 1 * 1000);

  sc.limit = 5;
  sc.latestUpdate = moment();
  sc.dataAge = -1;

  if(Data.latest != null) {
    setData(Data.latest);
  }

}]);