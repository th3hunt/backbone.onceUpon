(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.BackboneOnce = factory();
})(this, function () {
  'use strict';

  var BackboneOnce = {
    greet: function greet() {
      return 'hello';
    }
  };

  var backbone_once = BackboneOnce;

  return backbone_once;
});
//# sourceMappingURL=backbone-once.js.map
