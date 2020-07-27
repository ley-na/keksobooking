'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';

  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка запроса');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  window.backend = {
    load: load
  };

})();
