'use strict';

(function () {

  var initSlider = function (callback) {
    var Coord = {
      MIN: 0,
      MAX: 100
    };
    var effectLevel;

    var movePinHandler = function (downEvt) {
      downEvt.preventDefault();

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        var shiftCoordX = moveEvt.clientX - window.form.effectLevelLine.getBoundingClientRect().left;
        var currentCoordPin = Math.round(shiftCoordX * Coord.MAX / window.form.effectLevelLine.getBoundingClientRect().width);

        if (currentCoordPin >= Coord.MIN && currentCoordPin <= Coord.MAX) {
          window.form.effectLevelPin.style.left = currentCoordPin + '%';
          window.form.effectLevelDepth.style.width = currentCoordPin + '%';
          effectLevel = currentCoordPin;
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

    window.form.effectLevelPin.addEventListener('mousedown', movePinHandler);
  };

  initSlider(window.effects.setEffect);

})();
