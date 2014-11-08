'use strict';

var pageService = angular.module('eredax.pageService', []);

pageService.factory('Page', ['Config', function(Config) {
  var title = 'foobar';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
}]);

angular.module('eredax.page', [])

.controller('MainCtrl', ['$scope', 'Page', 'Config', function(sc, Page, Config) {
  sc.Page = Page;
  Config.getConfig().then(function(result) {
    sc.Page.setTitle(result.title);
  });
  
}]);