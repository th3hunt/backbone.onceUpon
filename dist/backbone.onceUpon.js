(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('backbone'), require('underscore')) : typeof define === 'function' && define.amd ? define(['backbone', 'underscore'], factory) : global.OnceUpon = factory(global.Backbone, global._);
})(this, function (Backbone, _) {
  'use strict';

  // Shamelessly copying from Marionette bind-entity-events

  function getOption(target, optionName) {
    if (!target || !optionName) {
      return;
    }
    if (target.options && target.options[optionName] !== undefined) {
      return target.options[optionName];
    } else {
      return target[optionName];
    }
  };

  // Bind the event to handlers specified as a string of
  // handler names on the target object
  function bindFromStrings(target, entity, evt, methods) {
    var methodNames = methods.split(/\s+/);

    _.each(methodNames, function (methodName) {
      var method = target[methodName];
      if (!method) {
        throw new Error('Method "' + methodName + '" was configured as an event handler, but does not exist.');
      }
      target.listenToOnce(entity, evt, method);
    });
  }

  // Bind the event to a supplied callback function
  function bindToFunction(target, entity, evt, method) {
    target.listenToOnce(entity, evt, method);
  }

  // Bind the event to handlers specified as a string of
  // handler names on the target object
  function unbindFromStrings(target, entity, evt, methods) {
    var methodNames = methods.split(/\s+/);

    _.each(methodNames, function (methodName) {
      var method = target[methodName];
      target.stopListening(entity, evt, method);
    });
  }

  // Bind the event to a supplied callback function
  function unbindToFunction(target, entity, evt, method) {
    target.stopListening(entity, evt, method);
  }

  // generic looping function
  function iterateEvents(target, entity, bindings, functionCallback, stringCallback) {
    if (!entity || !bindings) {
      return;
    }

    // type-check bindings
    if (!_.isObject(bindings)) {
      throw new Error('Bindings must be an object or function.');
    }

    // allow the bindings to be a function
    bindings = Marionette._getValue(bindings, target);

    // iterate the bindings and bind them
    _.each(bindings, function (methods, evt) {

      // allow for a function as the handler,
      // or a list of event names as a string
      if (_.isFunction(methods)) {
        functionCallback(target, entity, evt, methods);
      } else {
        stringCallback(target, entity, evt, methods);
      }
    });
  }

  // Export Public API
  Once.bindEntityEvents = function (target, entity, bindings) {
    iterateEvents(target, entity, bindings, bindToFunction, bindFromStrings);
  };

  Once.unbindEntityEvents = function (target, entity, bindings) {
    iterateEvents(target, entity, bindings, unbindToFunction, unbindFromStrings);
  };

  /**
   *
   * MyView = Backbone.OnceUpon.extend(Backbone.View) for all views
   *
   */

  Backbone.OnceUpon = {

    extend: function extend(View) {

      return View.extend({

        delegateEvents: function delegateEvents() {
          View.prototype.originalDelegateEvents.apply(this, arguments);
          bindEntityEvents(this, this, getOption(this, 'onceUponEvents'));
        },

        undelegateEvents: function undelegateEvents() {
          View.prototype.unbindEntityEvents(this, this, getOption(this, 'onceUponEvents'));
          View.prototype.originalUndelegateEvents.apply(this, arguments);
        }

      });
    }

  };

  var backbone_onceUpon = Backbone.OnceUpon;

  return backbone_onceUpon;
});
//# sourceMappingURL=backbone.onceUpon.js.map
