'use strict';

(function () {

  var Scale = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    PLUS: 1,
    MINUS: -1,
    DEFAULT: 100 + '%'
  };
  var imageUploadPreview = window.form.imageRedactForm.querySelector('.img-upload__preview');
  var scaleButtonMinus = window.form.imageRedactForm.querySelector('.scale__control--smaller');
  var scaleButtonPlus = window.form.imageRedactForm.querySelector('.scale__control--bigger');
  var scaleValue = window.form.imageRedactForm.querySelector('.scale__control--value');

  var setScale = function (scaleDirection) {
    var currentScaleValue = parseInt(scaleValue.value, 10);
    currentScaleValue = currentScaleValue + (Scale.STEP * scaleDirection);
    if (currentScaleValue >= Scale.MIN && currentScaleValue <= Scale.MAX) {
      imageUploadPreview.style.transform = 'scale(' + currentScaleValue / 100 + ')';
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
    imageUploadPreview.style.transform = '';
    scaleValue.value = Scale.DEFAULT;
  };

  window.scale = {
    reset: reset
  };

})();
