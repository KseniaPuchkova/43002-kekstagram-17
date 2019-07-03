'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.img-upload__form');
  var uploadFile = form.querySelector('#upload-file');
  var imageRedactForm = form.querySelector('.img-upload__overlay');
  var imageRedactFormClose = imageRedactForm.querySelector('#upload-cancel');
  var effectLevelBar = imageRedactForm.querySelector('.effect-level');
  var effectLevelPin = imageRedactForm.querySelector('.effect-level__pin');
  var effectLevelValue = imageRedactForm.querySelector('.effect-level__value');
  var effectLevelDepth = imageRedactForm.querySelector('.effect-level__depth');
  var effectLevelLine = imageRedactForm.querySelector('.effect-level__line');
  var imageBigPreview = imageRedactForm.querySelector('.img-upload__preview img');
  var effectsPreviews = imageRedactForm.querySelectorAll('.effects__preview ');
  var effectRadioButtons = imageRedactForm.querySelectorAll('.effects__radio');
  var hashtagsInput = imageRedactForm.querySelector('.text__hashtags');
  var comment = imageRedactForm.querySelector('.text__description');

  var onFormEscPress = function (evt) {
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
        imageBigPreview.src = reader.result;
        effectsPreviews.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
      });
      reader.readAsDataURL(file);
      imageRedactForm.classList.remove('hidden');
      effectLevelBar.classList.add('hidden');
      document.addEventListener('keydown', onFormEscPress);
    }
  };

  var closeImageRedactForm = function () {
    imageRedactForm.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
    clearImageRedactForm();
  };

  uploadFile.addEventListener('change', openImageRedactForm);

  imageRedactFormClose.addEventListener('click', closeImageRedactForm);

  form.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(form), closeImageRedactForm(), successHandler, errorHandler);
    evt.preventDefault();
    uploadHandler();
  });

  var clearImageRedactForm = function () {
    window.effects.reset();
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
    imageBigPreview: imageBigPreview,
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth,
    effectLevelValue: effectLevelValue,
    effectLevelLine: effectLevelLine,
    effectLevelBar: effectLevelBar,
    effectRadioButtons: effectRadioButtons
  };
})();
