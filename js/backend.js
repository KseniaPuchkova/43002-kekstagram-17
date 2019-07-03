'use strict';

(function () {

  var SERVER_URL = 'https://js.dump.academy/kekstagram';
  var NORMAL_STATUS = 200;
  var TIMEOUT = 1000;

  var makeRequest = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === NORMAL_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
  };

  var send = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    makeRequest(xhr, onLoad, onError);
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    makeRequest(xhr, onLoad, onError);
    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };

  window.backend = {
    send: send,
    load: load
  };

})();
