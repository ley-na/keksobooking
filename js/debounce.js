'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  window.debounce = function (callback) {

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
