'use strict';

(function () {

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var imageUploadTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
  var successInner;
  var errorInner;

  var appendMessage = function (templateType) {
    var element = templateType.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    window.util.main.appendChild(fragment);
  };

  var createSuccessMessage = function () {
    appendMessage(successTemplate);
    successInner = document.querySelector('.success__inner');
    var successButton = successInner.querySelector('.success__button');
    successButton.addEventListener('click', successButtonClickHandler);
    document.addEventListener('keydown', successMessageEscHandler);
    document.addEventListener('click', successOverlayClickHandler);
  };

  var successButtonClickHandler = function () {
    closeSuccessMessage();
  };

  var successOverlayClickHandler = function (evt) {
    if (evt.target !== successInner) {
      closeSuccessMessage();
    }
  };

  var successMessageEscHandler = function (evt) {
    window.util.isEscEvent(evt, null, null, closeSuccessMessage);
  };

  var closeSuccessMessage = function () {
    var successMessage = document.querySelector('.success');
    window.util.main.removeChild(successMessage);
    document.removeEventListener('keydown', successMessageEscHandler);
    document.removeEventListener('click', successOverlayClickHandler);
  };

  var createErrorMessage = function () {
    appendMessage(errorTemplate);
    errorInner = document.querySelector('.error__inner');
    var errorButtons = errorInner.querySelectorAll('.error__button');
    errorButtons.forEach(function (item) {
      item.addEventListener('click', errorMessageClickHandler);
    });
    document.addEventListener('keydown', errorMessageEscHandler);
    document.addEventListener('click', errorOverlayClickHandler);
  };

  var errorMessageClickHandler = function () {
    closeErrorMessage();
  };

  var errorOverlayClickHandler = function (evt) {
    if (evt.target !== errorInner) {
      closeErrorMessage();
    }
  };

  var errorMessageEscHandler = function (evt) {
    window.util.isEscEvent(evt, null, null, closeErrorMessage);
  };

  var closeErrorMessage = function () {
    var errorMessage = document.querySelector('.error');
    window.util.main.removeChild(errorMessage);
    document.removeEventListener('keydown', errorMessageEscHandler);
    document.removeEventListener('click', errorOverlayClickHandler);
  };

  var createImageUploadMessage = function () {
    appendMessage(imageUploadTemplate);
    setTimeout(closeUploadMessage, 500);
  };

  var closeUploadMessage = function () {
    var uploadMessage = document.querySelector('.img-upload__message');
    window.util.main.removeChild(uploadMessage);
  };

  window.messages = {
    createSuccessMessage: createSuccessMessage,
    createErrorMessage: createErrorMessage,
    createImageUploadMessage: createImageUploadMessage
  };

})();
