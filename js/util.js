'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var body = document.querySelector('body');
  var main = body.querySelector('main');

  var isEscEvent = function (evt, input1, input2, callback) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== input1 && evt.target !== input2) {
      callback();
    }
  };

  window.util = {
    body: body,
    main: main,
    isEscEvent: isEscEvent
  };
})();
