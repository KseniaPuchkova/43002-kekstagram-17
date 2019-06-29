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

  var imgBigPreview = window.form.imageRedactForm.querySelector('.img-upload__preview');
  var scaleButtonSmall = window.form.imageRedactForm.querySelector('.scale__control--smaller');
  var scaleButtonBig = window.form.imageRedactForm.querySelector('.scale__control--bigger');
  var scaleValue = window.form.imageRedactForm.querySelector('.scale__control--value');

  var setScale = function (scaleDirection) {
    var currentScaleValue = parseInt(scaleValue.value, 10);
    currentScaleValue = currentScaleValue + (Scale.STEP * scaleDirection);
    if (currentScaleValue >= Scale.MIN && currentScaleValue <= Scale.MAX) {
      imgBigPreview.style.transform = 'scale(' + currentScaleValue / 100 + ')';
      scaleValue.value = currentScaleValue + '%';
    }
  };

  scaleButtonSmall.addEventListener('click', function () {
    setScale(Scale.MINUS);
  });

  scaleButtonBig.addEventListener('click', function () {
    setScale(Scale.PLUS);
  });

  var reset = function () {
    imgBigPreview.style.transform = '';
    scaleValue.value = Scale.DEFAULT;
  };

  window.scale = {
    reset: reset
  };

})();
