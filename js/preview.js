'use strict';

(function () {

  var MAX_COMMENTS = 5;
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsLoaderElement = bigPictureElement.querySelector('.social__comments-loader');
  var socialCommentsContainer = bigPictureElement.querySelector('.social__comments');
  var socialCommentsCount = bigPictureElement.querySelector('.social__comment-count');
  var bigPictureData;
  var index;

  var getBigPicture = function (bigPicture) {
    bigPictureData = bigPicture;
    index = 0;
    window.util.body.classList.add('modal-open');
    document.querySelector('.big-picture').classList.remove('hidden');
    bigPictureElement.querySelector('img').src = bigPicture.url;
    bigPictureElement.querySelector('img').alt = 'Случайная фотография';
    bigPictureElement.querySelector('.likes-count').textContent = bigPicture.likes;
    bigPictureElement.querySelector('.social__caption').textContent = bigPicture.description.toString();
    commentsLoaderElement.classList.remove('visually-hidden');
    clearComments();
    addComments(bigPicture);
    socialCommentsCount.innerHTML = socialCommentsContainer.children.length + ' из ' + bigPicture.comments.length + ' комментариев';
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
    socialCommentsContainer.appendChild(fragment);
  };

  var addComments = function (arr) {
    var startIndex = index;
    var endIndex = index += MAX_COMMENTS;
    appendComments(arr.comments.slice(startIndex, endIndex));
    if (arr.comments.length === socialCommentsContainer.children.length) {
      commentsLoaderElement.classList.add('visually-hidden');
    }
  };

  var clearComments = function () {
    socialCommentsContainer.innerHTML = '';
  };

  var сommentsClickHandler = function () {
    addComments(bigPictureData);
    socialCommentsCount.innerHTML = socialCommentsContainer.children.length + ' из ' + bigPictureData.comments.length + ' комментариев';
  };

  commentsLoaderElement.addEventListener('click', сommentsClickHandler);

  window.preview = {
    bigPictureElement: bigPictureElement,
    getBigPicture: getBigPicture
  };

})();
