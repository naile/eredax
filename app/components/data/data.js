'use strict';

var dataServices = angular.module('eredax.dataServices', ['ngResource']);

dataServices.factory('Data', ['$resource',
  function($resource){
    return $resource('data/:mockdata.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);