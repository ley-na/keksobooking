'use strict';

(function () {
  // Словарь пределов перемещения по карте
  var mapBorder = {
    top: window.data.locationYMin - window.form.pinActiveHeight,
    bottom: window.data.locationYMax - window.form.pinActiveHeight,
    left: window.data.loactionXMin - Math.ceil(window.form.pinWidth / 2),
    right: window.data.locationXMax - Math.ceil(window.form.pinWidth / 2)
  };

  // Перемещение пина
  window.form.mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Функция проверки пределов перемещения
      if (window.form.mainPin.offsetLeft - shift.x < mapBorder.left) {
        window.form.mainPin.style.left = mapBorder.left + 'px';
      } else if (window.form.mainPin.offsetLeft - shift.x > mapBorder.right) {
        window.form.mainPin.style.left = mapBorder.right + 'px';
      } else {
        window.form.mainPin.style.left = (window.form.mainPin.offsetLeft - shift.x) + 'px';
      }

      if (window.form.mainPin.offsetTop - shift.y < mapBorder.top) {
        window.form.mainPin.style.top = mapBorder.top + 'px';
      } else if (window.form.mainPin.offsetTop - shift.y > mapBorder.bottom) {
        window.form.mainPin.style.top = mapBorder.bottom + 'px';
      } else {
        window.form.mainPin.style.top = (window.form.mainPin.offsetTop - shift.y) + 'px';
      }

      window.form.insertDefaultAddressEnabled();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
