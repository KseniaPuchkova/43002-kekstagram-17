'use strict';

(function () {

  var initSlider = function (callback) {
    var MIN_COORDS = 0;
    var MAX_COORDS = 450;

    var pinMoveHandler = function (evt) {
      evt.preventDefault();
      var startCoordsX = evt.clientX;

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        var shiftX = startCoordsX - moveEvt.clientX;
        startCoordsX = moveEvt.clientX;
        var coordsPin = (window.form.effectLevelPin.offsetLeft - shiftX) + 'px';

        if ((parseInt(coordsPin, 10) >= MIN_COORDS) && (parseInt(coordsPin, 10) <= MAX_COORDS)) {
          window.form.effectLevelPin.style.left = coordsPin;
          window.form.effectLevelDepth.style.width = coordsPin;
          window.form.effectLevel = Math.round(parseInt(coordsPin, 10) / MAX_COORDS * 100);
          window.form.effectLevelValue.value = window.form.effectLevel;
        }
        callback(window.form.effectLevel);
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    window.form.effectLevelPin.addEventListener('mousedown', pinMoveHandler);
  };

  initSlider(window.form.setEffect);

})();
