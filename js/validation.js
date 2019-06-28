'use strict';

(function () {

  var imageRedactForm = document.querySelector('.img-upload__overlay');
  var commentsInput = imageRedactForm.querySelector('.text__description');
  var commentsErrorText = {
    COMMENTS_MAX_SYMBOL: 'Длина комментария не может составлять больше 140 символов.'
  };

  var checkCommentLength = function (arr) {
    if (arr.length >= 140) {
      return commentsErrorText.COMMENTS_MAX_SYMBOL;
    }
    return '';
  };

  var commentsInvalidHandler = function () {
    var arrComments = commentsInput.value;
    var arrCommentsErrors = checkCommentLength(arrComments);
    commentsInput.setCustomValidity(arrCommentsErrors);
    commentsInput.style.outline = (arrCommentsErrors.length !== 0) ? '2px solid #ff0000' : '';
  };

  commentsInput.addEventListener('input', commentsInvalidHandler);


  var reset = function () {
    commentsInput.setCustomValidity('');
    commentsInput.style.outline = '';
    commentsInput.value = '';
  };

  window.hashtagsValidity = {
    reset: reset
  };

})();
