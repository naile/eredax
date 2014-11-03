'use strict';

describe('eredax.version module', function() {
  beforeEach(module('eredax.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
