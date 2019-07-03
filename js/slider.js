'use strict';

(function () {

  var initSlider = function (callback) {
    var Coords = {
      MIN: 0,
      MAX: 100
    };
    var effectLevel;

    var mouseDownHandler = function (downEvt) {
      downEvt.preventDefault();
      var startCoordX = downEvt.clientX;

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        var shiftX = startCoordX - moveEvt.clientX;
        startCoordX = moveEvt.clientX;
        var coordPin = Math.round((window.form.effectLevelPin.offsetLeft - shiftX) * 100 / window.form.effectLevelLine.offsetWidth);

        if (coordPin >= Coords.MIN && coordPin <= Coords.MAX) {
          window.form.effectLevelPin.style.left = coordPin + '%';
          window.form.effectLevelDepth.style.width = coordPin + '%';
          effectLevel = coordPin;
          window.form.effectLevelValue.value = effectLevel;
        }
        callback(effectLevel);
      };
      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    window.form.effectLevelPin.addEventListener('mousedown', mouseDownHandler);
  };

  initSlider(window.effects.setEffect);

})();
