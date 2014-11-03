'use strict';

angular.module('eredax.version', [
  'eredax.version.interpolate-filter',
  'eredax.version.version-directive'
])

.value('version', '0.1');
