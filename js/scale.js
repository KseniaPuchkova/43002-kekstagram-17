'use strict';

(function () {

  var Scale = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    PLUS: 1,
    MINUS: -1,
    DEFAULT: '100%'
  };
  var imageRedactForm = document.querySelector('.img-upload__overlay');
  var imageBigPreview = imageRedactForm.querySelector('.img-upload__preview');
  var scaleButtonMinus = imageRedactForm.querySelector('.scale__control--smaller');
  var scaleButtonPlus = imageRedactForm.querySelector('.scale__control--bigger');
  var scaleValue = imageRedactForm.querySelector('.scale__control--value');

  var setScale = function (scaleDirection) {
    var currentScaleValue = parseInt(scaleValue.value, 10);
    currentScaleValue = currentScaleValue + (Scale.STEP * scaleDirection);
    if (currentScaleValue >= Scale.MIN && currentScaleValue <= Scale.MAX) {
      imageBigPreview.style.transform = 'scale(' + currentScaleValue / 100 + ')';
      scaleValue.value = currentScaleValue + '%';
    }
  };

  scaleButtonMinus.addEventListener('click', function () {
    setScale(Scale.MINUS);
  });

  scaleButtonPlus.addEventListener('click', function () {
    setScale(Scale.PLUS);
  });

  var reset = function () {
    imageBigPreview.style.transform = '';
    scaleValue.value = Scale.DEFAULT;
  };

  window.scale = {
    reset: reset
  };

})();
