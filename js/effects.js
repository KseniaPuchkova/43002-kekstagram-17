'use strict';

(function () {

  var EffectValue = {
    MIN: 0,
    MAX: 100
  };

  var valueToEffect = {
    'none': {
      'effectName': 'effects__preview--none',
      'min': null,
      'max': null,
      'setEffect': function () {
        window.form.imageBigPicture.style.filter = '';
      }
    },
    'chrome': {
      'effectName': 'effects__preview--chrome',
      'min': 0,
      'max': 1,
      'setEffect': function (level) {
        window.form.imageBigPicture.style.filter = 'grayscale(' + level + ')';
      }
    },
    'sepia': {
      'effectName': 'effects__preview--sepia',
      'min': 0,
      'max': 1,
      'setEffect': function (level) {
        window.form.imageBigPicture.style.filter = 'sepia(' + level + ')';
      }
    },
    'marvin': {
      'effectName': 'effects__preview--marvin',
      'min': 0,
      'max': 100,
      'setEffect': function (level) {
        window.form.imageBigPicture.style.filter = 'invert(' + (level * this.max) + '%)';
      }
    },
    'phobos': {
      'effectName': 'effects__preview--phobos',
      'min': 0,
      'max': 3,
      'setEffect': function (level) {
        window.form.imageBigPicture.style.filter = 'blur(' + (level * this.max) + 'px)';
      }
    },
    'heat': {
      'effectName': 'effects__preview--heat',
      'min': 1,
      'max': 3,
      'setEffect': function (level) {
        window.form.imageBigPreview.style.filter = 'brightness(' + ((level * (this.max - this.min)) + this.min) + ')';
      }
    }
  };

  var checkButtonValue = function () {
    var effectButtonChecked = window.form.imageRedactForm.querySelector('input[type="radio"]:checked');
    var effectButtonCheckedValue = effectButtonChecked.value;
    return effectButtonCheckedValue;
  };

  var addClass = function (effectClass) {
    var currentEffectClass = window.form.imageBigPicture.className;
    if (window.form.imageBigPicture.classList.contains(currentEffectClass)) {
      window.form.imageBigPicture.classList.remove(currentEffectClass);
    }
    window.form.imageBigPicture.classList.add(effectClass);
    window.form.effectLevelBar.classList.remove('hidden');
    if (effectClass === valueToEffect['none']['effectName']) {
      window.form.effectLevelBar.classList.add('hidden');
    }
  };

  var setEffect = function (effectLevel) {
    valueToEffect[checkButtonValue()].setEffect(effectLevel / 100);
  };

  var effectPreviewClickHandler = function (effectValueLevel) {
    window.form.effectLevelPin.style.left = effectValueLevel + '%';
    window.form.effectLevelDepth.style.width = effectValueLevel + '%';
    addClass(valueToEffect[checkButtonValue()]['effectName']);
    setEffect(effectValueLevel);
  };

  window.form.effectRadioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('click', function () {
      effectPreviewClickHandler(EffectValue.MAX);
    });
  });

  var reset = function () {
    window.form.effectRadioButtons[0].checked = true;
    addClass(valueToEffect['none']['effectName']);
    window.form.imageBigPicture.style.filter = '';
  };

  window.effects = {
    setEffect: setEffect,
    reset: reset
  };
})();
