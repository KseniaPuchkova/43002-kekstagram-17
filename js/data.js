'use strict';

(function () {

  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var PICTURES_NUMBER = 25;

  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var generatePictures = function () {
    pictures = [];
    for (var i = 0; i < PICTURES_NUMBER; i++) {
      pictures.push({
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.random.getRandomNumber(15, 200),
        comments: [comments[window.random.getRandomNumber(0, 5)], comments[window.random.getRandomNumber(0, 5)]],
        commentsCount: window.random.getRandomNumber(15, 200)
      });
    }
    return pictures;
  };

  var pictures = generatePictures();

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var appendPictures = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(renderPicture(item));
    });
    picturesContainer.appendChild(fragment);
  };

  appendPictures(pictures);

})();
