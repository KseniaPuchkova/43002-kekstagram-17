'use strict';

(function () {

  var LEVEL_MAX = 100 + '%';
  var VALUE_MAX = 100;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.img-upload__form');
  var uploadFile = form.querySelector('#upload-file');
  var imageRedactForm = form.querySelector('.img-upload__overlay');
  var imageRedactFormClose = imageRedactForm.querySelector('#upload-cancel');
  var effectLevelBar = imageRedactForm.querySelector('.effect-level');
  var effectLevelPin = imageRedactForm.querySelector('.effect-level__pin');
  var effectLevelDepth = imageRedactForm.querySelector('.effect-level__depth');
  var effectLevelValue = imageRedactForm.querySelector('.effect-level__value');
  var effectRadioButtons = imageRedactForm.querySelectorAll('.effects__radio');
  var imgBigPreview = imageRedactForm.querySelector('.img-upload__preview img');
  var effectsPreviews = imageRedactForm.querySelectorAll('.effects__preview ');
  var hashtagsInput = imageRedactForm.querySelector('.text__hashtags');
  var comment = imageRedactForm.querySelector('.text__description');
  var btnCheckedValue;
  var effectLevelMove;
  var effectNames = [
    'effects__preview--none',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  ];
  var valueToEffects = {
    none: {
      effectName: 'effects__preview--none',
      min: null,
      max: null,
      setEffect: function () {
        imgBigPreview.style.filter = '';
      }
    },
    chrome: {
      effectName: 'effects__preview--chrome',
      min: 0,
      max: 1,
      setEffect: function (level) {
        imgBigPreview.style.filter = 'grayscale(' + level + ')';
      }
    },
    sepia: {
      effectName: 'effects__preview--sepia',
      min: 0,
      max: 1,
      setEffect: function (level) {
        imgBigPreview.style.filter = 'sepia(' + level + ')';
      }
    },
    marvin: {
      effectName: 'effects__preview--marvin',
      min: 0,
      max: 100,
      setEffect: function (level) {
        imgBigPreview.style.filter = 'invert(' + (level * this.max) + '%)';
      }
    },
    phobos: {
      effectName: 'effects__preview--phobos',
      min: 0,
      max: 3,
      setEffect: function (level) {
        imgBigPreview.style.filter = 'blur(' + (level * this.max) + 'px)';
      }
    },
    heat: {
      effectName: 'effects__preview--heat',
      min: 1,
      max: 3,
      setEffect: function (level) {
        imgBigPreview.style.filter = 'brightness(' + ((level * (this.max - this.min)) + this.min) + ')';
      }
    }
  };

  var formEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, hashtagsInput, comment, closeImageRedactForm);
  };

  var openImageRedactForm = function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgBigPreview.src = reader.result;
        effectsPreviews.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
      });
      reader.readAsDataURL(file);
      imageRedactForm.classList.remove('hidden');
      effectLevelBar.classList.add('hidden');
      document.addEventListener('keydown', formEscPressHandler);
    }
  };

  var closeImageRedactForm = function () {
    imageRedactForm.classList.add('hidden');
    document.removeEventListener('keydown', formEscPressHandler);
    clearRedactForm();
  };

  uploadFile.addEventListener('change', openImageRedactForm);

  imageRedactFormClose.addEventListener('click', closeImageRedactForm);

  var checkBtnValue = function () {
    effectRadioButtons.forEach(function (radioBtn) {
      if (radioBtn.checked) {
        btnCheckedValue = radioBtn.value;
      }
    });
    return btnCheckedValue;
  };

  var addClass = function (effectClass) {
    effectNames.forEach(function (effectName) {
      imgBigPreview.classList.remove(effectName);
    });
    imgBigPreview.classList.add(effectClass);

    effectLevelBar.classList.remove('hidden');
    if (effectClass === effectNames[0]) {
      effectLevelBar.classList.add('hidden');
    }
  };

  var setEffect = function (effectLevel) {
    effectLevelMove = effectLevel / 100;
    addClass(valueToEffects[checkBtnValue()].effectName);
    valueToEffects[checkBtnValue()].setEffect(effectLevelMove);
  };

  var effectClickHandler = function () {
    effectLevelPin.style.left = LEVEL_MAX;
    effectLevelDepth.style.width = LEVEL_MAX;
    effectLevelValue.value = VALUE_MAX;
    setEffect(VALUE_MAX);
  };

  effectRadioButtons.forEach(function (radioBtn) {
    radioBtn.addEventListener('click', effectClickHandler);
  });

  form.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(form), closeImageRedactForm(), successHandler, errorHandler);
    evt.preventDefault();
    uploadHandler();
  });

  var clearRedactForm = function () {
    uploadFile.value = '';
    addClass(valueToEffects['none'].effectsName);
    imgBigPreview.style.filter = '';
    window.scale.reset();
    window.hashtagsValidity.reset();
  };

  var uploadHandler = function () {
    window.messages.createUploadMessage();
  };

  var successHandler = function () {
    window.messages.createSuccessMessage();
  };

  var errorHandler = function () {
    window.messages.createErrorMessage();
  };

  window.form = {
    imageRedactForm: imageRedactForm,
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth,
    effectLevelValue: effectLevelValue,
    setEffect: setEffect
  };

})();
