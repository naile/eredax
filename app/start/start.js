'use strict';

angular.module('eredax.start', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'start/start.html',
    controller: 'StartCtrl'
  });
}])

.controller('StartCtrl', ['$scope', 'Data', function(sc, Data) {
  function setData(data) {
    sc.trains = data.ResponseData.Trains;
    sc.buses = data.ResponseData.Buses;
    sc.latestUpdate = moment(data.ResponseData.LatestUpdate);
    sc.limit = Data.limit;
  }

  sc.$on('newList', function(ev, data) {
    setData(data);
  });

  sc.limit = 5;
  sc.latestUpdate = moment();
  if(Data.latest != null) {
    setData(Data.latest);
  }

}]);