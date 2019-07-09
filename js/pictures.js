'use strict';

(function () {

  window.pictures = [];
  window.bigPicture = document.querySelector('.big-picture');
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var commentBigPicture = window.bigPicture.querySelector('.big-picture__social .social__footer-text');
  var bigPictureClose = window.bigPicture.querySelector('#picture-cancel');

  var renderPicture = function (item) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = item.url;
    picture.querySelector('.picture__likes').textContent = item.likes;
    picture.querySelector('.picture__comments').textContent = item.comments.length;

    var openPicture = function () {
      window.preview.openBigPicture(item);
      document.addEventListener('keydown', bigPictureEscPressHandler);
    };

    picture.addEventListener('click', openPicture);

    return picture;
  };

  var closeBigPicture = function () {
    window.bigPicture.classList.add('hidden');
    window.util.body.classList.remove('modal-open');
    document.removeEventListener('keydown', bigPictureEscPressHandler);
  };

  var bigPictureEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, commentBigPicture, null, closeBigPicture);
  };

  bigPictureClose.addEventListener('click', closeBigPicture);

  bigPictureClose.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  });

  window.appendPictures = function (arrPictures) {
    removePictures();
    var fragment = document.createDocumentFragment();
    arrPictures.forEach(function (item) {
      fragment.appendChild(renderPicture(item));
    });
    picturesContainer.appendChild(fragment);
  };

  var removePictures = function () {
    var arrPictures = picturesContainer.querySelectorAll('.picture');
    arrPictures.forEach(function (item) {
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
