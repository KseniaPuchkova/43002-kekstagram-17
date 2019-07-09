'use strict';

(function () {

  var NEW_PICTURES_MAX = 10;
  var imageFiltersButtons = document.querySelectorAll('.img-filters__button');
  var buttonToValue = {
    'filter-popular': function (arr) {
      return arr;
    },
    'filter-new': function (arr) {
      var picturesNew = arr.slice().sort(function () {
        return Math.random() - Math.random();
      }).slice(0, NEW_PICTURES_MAX);
      return picturesNew;
    },
    'filter-discussed': function (arr) {
      var picturesDiscussed = arr.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      return picturesDiscussed;
    }
  };

  var setButtonActive = function (buttonClicked) {
    var buttonActive = document.querySelector('.img-filters__button--active');
    buttonActive.classList.remove('img-filters__button--active');
    buttonClicked.classList.add('img-filters__button--active');
  };

  var filterClickHandler = function (evt) {
    var target = evt.target;
    setButtonActive(target);
    window.appendPictures(buttonToValue[target.id](window.pictures));
  };

  imageFiltersButtons.forEach(function (imageFilterButton) {
    imageFilterButton.addEventListener('click', window.debounce(filterClickHandler));
  });

})();
