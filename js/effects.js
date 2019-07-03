'use strict';

(function () {

  var EffectValue = {
    MIN: 0,
    MAX: 100
  };

  var valueToEffects = {
    none: {
      effectName: 'effects__preview--none',
      min: null,
      max: null,
      setEffect: function () {
        window.form.imageBigPreview.style.filter = '';
      }
    },
    chrome: {
      effectName: 'effects__preview--chrome',
      min: 0,
      max: 1,
      setEffect: function (level) {
        window.form.imageBigPreview.style.filter = 'grayscale(' + level + ')';
      }
    },
    sepia: {
      effectName: 'effects__preview--sepia',
      min: 0,
      max: 1,
      setEffect: function (level) {
        window.form.imageBigPreview.style.filter = 'sepia(' + level + ')';
      }
    },
    marvin: {
      effectName: 'effects__preview--marvin',
      min: 0,
      max: 100,
      setEffect: function (level) {
        window.form.imageBigPreview.style.filter = 'invert(' + (level * this.max) + '%)';
      }
    },
    phobos: {
      effectName: 'effects__preview--phobos',
      min: 0,
      max: 3,
      setEffect: function (level) {
        window.form.imageBigPreview.style.filter = 'blur(' + (level * this.max) + 'px)';
      }
    },
    heat: {
      effectName: 'effects__preview--heat',
      min: 1,
      max: 3,
      setEffect: function (level) {
        window.form.imageBigPreview.style.filter = 'brightness(' + ((level * (this.max - this.min)) + this.min) + ')';
      }
    }
  };

  var effectLevelMove;

  var checkButtonValue = function () {
    var effectButtonChecked = window.form.imageRedactForm.querySelector('input[type="radio"]:checked');
    var effectButtonCheckedValue = effectButtonChecked.value;
    return effectButtonCheckedValue;
  };

  var addClass = function (effectClass) {
    var currentEffectClass = window.form.imageBigPreview.className;
    if (window.form.imageBigPreview.classList.contains(currentEffectClass)) {
      window.form.imageBigPreview.classList.remove(currentEffectClass);
    }
    window.form.imageBigPreview.classList.add(effectClass);
    window.form.effectLevelBar.classList.remove('hidden');
    if (effectClass === valueToEffects['none'].effectName) {
      window.form.effectLevelBar.classList.add('hidden');
    }
  };

  var setEffect = function (effectLevel) {
    effectLevelMove = effectLevel / 100;
    addClass(valueToEffects[checkButtonValue()].effectName);
    valueToEffects[checkButtonValue()].setEffect(effectLevelMove);
  };

  var effectMaxClickHandler = function () {
    window.form.effectLevelPin.style.left = EffectValue.MAX + '%';
    window.form.effectLevelDepth.style.width = EffectValue.MAX + '%';
    window.form.effectLevelValue.value = EffectValue.MAX;
    setEffect(EffectValue.MAX);
  };

  window.form.effectRadioButtons.forEach(function (radioBtn) {
    radioBtn.addEventListener('click', effectMaxClickHandler);
  });

  var reset = function () {
    addClass(valueToEffects['none'].effectName);
    window.form.imageBigPreview.style.filter = '';
  };

  window.effects = {
    setEffect: setEffect,
    reset: reset
  };

})();
