'use strict';

(function () {

  var getRandomNumber = function (min, max) {
    var random = Math.floor(Math.random() * (max - min + 1) + min);
    return random;
  };

  window.random = {
    getRandomNumber: getRandomNumber
  };
})();
