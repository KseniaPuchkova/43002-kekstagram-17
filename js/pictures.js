'use strict';

(function () {

  window.pictures = [];
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var commentBigPicture = document.querySelector('.big-picture__social .social__footer-text');
  var bigPictureClose = document.querySelector('#picture-cancel');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    var openPicture = function () {
      window.preview.getBigPicture(picture);
      document.addEventListener('keydown', closeBigPictureOnEsc);
    };

    pictureElement.addEventListener('click', openPicture);
    pictureElement.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, window.preview.getBigPicture);
    });
    return pictureElement;
  };

  var closeBigPicture = function () {
    window.preview.bigPictureElement.classList.add('hidden');
    window.util.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeBigPictureOnEsc);
  };

  var closeBigPictureOnEsc = function (evt) {
    window.util.isEscEvent(evt, commentBigPicture, null, closeBigPicture);
  };

  bigPictureClose.addEventListener('click', closeBigPicture);

  bigPictureClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeBigPicture);
  });

  window.appendPictures = function (arr) {
    removePictures();
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(renderPicture(item));
    });
    picturesContainer.appendChild(fragment);
  };

  var removePictures = function () {
    var arrPicture = picturesContainer.querySelectorAll('.picture');
    arrPicture.forEach(function (item) {
      picturesContainer.removeChild(item);
    });
  };

  var successHandler = function (data) {
    window.pictures = data;
    window.appendPictures(window.pictures);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  var errorHandler = function () {
    window.messages.createErrorMessage();
  };

  window.backend.load(successHandler, errorHandler);

})();
