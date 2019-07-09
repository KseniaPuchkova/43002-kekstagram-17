'use strict';

(function () {

  var HASHTAGS_QUANTITY = 5;
  var HASHTAG_LENGTH = 20;
  var COMMENT_MAX_SYMBOL = 140;
  var HashtagsErrorText = {
    MAX_FIVE: 'Нельзя указать больше пяти хэш-тегов.',
    ONE_SYMBOL: 'Хештег не может состоять только из одного символа # (решетка).',
    BEGIN_SYMBOL: 'Хэштег начинается с символа # (решетка).',
    MAX_LENGTH: 'Максимальная длина одного хэштега 20 символов, включая решётку.',
    SPACE: 'Хэштеги должны разделяться пробелами.',
    SAME: 'Один и тот же хэштег не может быть использован дважды.'
  };
  var CommentsErrorText = {
    MAX_SYMBOL: 'Длина комментария не может составлять больше 140 символов.'
  };
  var hashtagsInput = window.form.imageRedactForm.querySelector('.text__hashtags');
  var commentsInput = window.form.imageRedactForm.querySelector('.text__description');

  var checkMaxFiveHashtags = function (arr) {
    if (arr.length > HASHTAGS_QUANTITY) {
      return HashtagsErrorText.MAX_FIVE;
    }
    return '';
  };

  var checkBeginSymbolHashtag = function (arr) {
    var hashtagError = arr.some(function (arrItem) {
      return arrItem[0] !== '#';
    });
    if (hashtagError) {
      return HashtagsErrorText.BEGIN_SYMBOL;
    }
    return '';
  };

  var checkOneSymbolHashtag = function (arr) {
    var hashtagError = arr.some(function (arrItem) {
      return arrItem.length === 1 && arrItem[0] === '#';
    });
    if (hashtagError) {
      return HashtagsErrorText.ONE_SYMBOL;
    }
    return '';
  };

  var checkMaxLengthHashtag = function (arr) {
    var hashtagError = arr.some(function (arrItem) {
      return arrItem.length > HASHTAG_LENGTH;
    });
    if (hashtagError) {
      return HashtagsErrorText.MAX_LENGTH;
    }
    return '';
  };

  var checkSpaceHashtags = function (arr) {
    var hashtagError = arr.some(function (arrItem) {
      return arrItem.indexOf('#', 1) > 0;
    });
    if (hashtagError) {
      return HashtagsErrorText.SPACE;
    }
    return '';
  };

  var checkSameHashtags = function (arr) {
    var hashtagError = arr.some(function (arrItem, index) {
      return arr.indexOf(arrItem) !== index;
    });
    if (hashtagError) {
      return HashtagsErrorText.SAME;
    }
    return '';
  };

  var getArrHashtagsErrors = function (arr) {
    var hashtagsArrErrors = [
      checkBeginSymbolHashtag(arr),
      checkOneSymbolHashtag(arr),
      checkMaxLengthHashtag(arr),
      checkSpaceHashtags(arr),
      checkSameHashtags(arr),
      checkMaxFiveHashtags(arr)
    ];
    return hashtagsArrErrors;
  };

  var checkCommentLength = function (arr) {
    if (arr.length >= COMMENT_MAX_SYMBOL) {
      return CommentsErrorText.MAX_SYMBOL;
    }
    return '';
  };

  var hashtagsInputHandler = function () {
    var arrHashtags = hashtagsInput.value.toLowerCase().trim().split(' ');
    var arrHashtagsErrors = getArrHashtagsErrors(arrHashtags).filter(function (errorNull) {
      return errorNull !== '';
    });
    hashtagsInput.setCustomValidity(arrHashtagsErrors.join(' '));
    hashtagsInput.style.outline = (arrHashtagsErrors.length !== 0) ? '2px solid #ff0000' : '';
    if (hashtagsInput.value === '') {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.style.outline = '';
    }
  };

  var commentsInputHandler = function () {
    var arrComments = commentsInput.value;
    var arrCommentsErrors = checkCommentLength(arrComments);
    commentsInput.setCustomValidity(arrCommentsErrors);
    commentsInput.style.outline = (arrCommentsErrors.length !== 0) ? '2px solid #ff0000' : '';
  };

  hashtagsInput.addEventListener('input', hashtagsInputHandler);
  commentsInput.addEventListener('input', commentsInputHandler);

  var reset = function () {
    hashtagsInput.style.outline = '';
    hashtagsInput.value = '';
    hashtagsInput.setCustomValidity('');
    commentsInput.style.outline = '';
    commentsInput.value = '';
    commentsInput.setCustomValidity('');
  };

  window.validation = {
    reset: reset
  };

})();
