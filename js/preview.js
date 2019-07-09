'use strict';

(function () {

  var MAX_COMMENTS = 5;
  var commentsLoader = window.bigPicture.querySelector('.social__comments-loader');
  var commentsContainer = window.bigPicture.querySelector('.social__comments');
  var commentsCount = window.bigPicture.querySelector('.social__comment-count');
  var bigPictureData;
  var index;

  var openBigPicture = function (item) {
    bigPictureData = item;
    index = 0;
    window.util.body.classList.add('modal-open');
    window.bigPicture.classList.remove('hidden');
    window.bigPicture.querySelector('img').src = item.url;
    window.bigPicture.querySelector('img').alt = 'Случайная фотография';
    window.bigPicture.querySelector('.likes-count').textContent = item.likes;
    window.bigPicture.querySelector('.social__caption').textContent = item.description;
    commentsLoader.classList.remove('visually-hidden');
    clearComments();
    addComments(item);
  };

  var createComment = function (comment) {
    var tagLi = document.createElement('li');
    var tagImg = document.createElement('img');
    var tagP = document.createElement('p');
    tagLi.classList.add('social__comment');
    tagImg.classList.add('social__picture');
    tagImg.src = comment.avatar;
    tagImg.alt = 'Аватар комментатора фотографии';
    tagImg.width = '35';
    tagImg.height = '35';
    tagP.classList.add('social__text');
    tagP.textContent = comment.message;
    tagLi.appendChild(tagImg);
    tagLi.appendChild(tagP);

    return tagLi;
  };

  var appendComments = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(createComment(item));
    });
    commentsContainer.appendChild(fragment);
  };

  var addComments = function (arr) {
    var startIndex = index;
    var lastIndex = index += MAX_COMMENTS;
    appendComments(arr.comments.slice(startIndex, lastIndex));
    if (arr.comments.length === commentsContainer.children.length) {
      commentsLoader.classList.add('visually-hidden');
    }
    commentsCount.textContent = commentsContainer.children.length + ' из ' + arr.comments.length + ' комментариев';
  };

  var clearComments = function () {
    commentsContainer.innerHTML = '';
  };

  var сommentsClickHandler = function () {
    addComments(bigPictureData);
  };

  commentsLoader.addEventListener('click', сommentsClickHandler);

  window.preview = {
    openBigPicture: openBigPicture
  };

})();
