'use strict';

(function () {
  var OFFERS_NUMBER = 8;

  // Спрятать карту
  var disablePage = function () {
    window.form.insertDefaultAddressDisabled();
    window.form.disableElements(window.form.adFieldsets);
    window.form.disableElements(window.form.filterElements);
    document.addEventListener('keydown', onPinPress);
    window.form.mainPin.addEventListener('mousedown', onPinMousedown);
    window.pin.clear();
  };

  // Показать карту
  var enablePage = function () {
    window.pin.map.classList.remove('map--faded');
    window.form.ad.classList.remove('ad-form--disabled');
    window.form.insertDefaultAddressEnabled();
    window.pin.render(offers);
    window.form.enableElements(window.form.adFieldsets);
    window.form.enableElements(window.form.filterElements);
    document.removeEventListener('keydown', onPinPress);
    window.form.mainPin.removeEventListener('mousedown', onPinMousedown);
  };

  var onPinPress = function (evt) {
    if (evt.key === 'Enter') {
      enablePage();
    }
  };

  var onPinMousedown = function (evt) {
    if (evt.button === 0) {
      enablePage();
    }
  };

  var offers = window.data.generateOffers(OFFERS_NUMBER);
  disablePage();
  window.form.validateRooms();
  window.form.validatePrice();
})();
