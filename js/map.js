'use strict';

(function () {

  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  // Спрятать карту
  var disablePage = function () {
    window.form.setAddressDisabled();
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
    window.form.setAddressEnabled();
    window.form.enableElements(window.form.adFieldsets);
    window.form.enableElements(window.form.filterElements);
    document.removeEventListener('keydown', onPinPress);
    window.form.mainPin.removeEventListener('mousedown', onPinMousedown);
    window.backend.load(onSuccessLoad, onErrorLoad);
  };

  var onPinPress = function () {
    if (window.utils.isEscPressed) {
      enablePage();
    }
  };

  var onPinMousedown = function (evt) {
    if (evt.button === 0) {
      enablePage();
    }
  };

  var onErrorEscPress = function (evt) {
    if (window.utils.isEscPressed) {
      evt.preventDefault();
      closeError();
    }
  };

  var onErrorClick = function (evt) {
    if (evt.target === document.querySelector('.error')) {
      evt.preventDefault();
      closeError();
    }
  };

  var onErrorButtonClick = function () {
    closeError();
  };

  var closeError = function () {
    document.querySelector('div.error').remove();
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('keydown', onErrorClick);
    document.removeEventListener('click', onErrorButtonClick);
  };

  var showError = function (errorMessage) {
    var errorElement = errorMessageTemplate.cloneNode(true);

    var messageText = errorElement.querySelector('.error__message');
    messageText.textContent = errorMessage;

    var message = document.querySelector('main').appendChild(errorMessageTemplate);
    var errorButton = message.querySelector('.error__button');

    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorClick);
    errorButton.addEventListener('click', onErrorButtonClick);
  };

  var onSuccessLoad = function (data) {
    window.pin.render(data);
  };

  var onErrorLoad = function (message) {
    showError(message);
  };

  disablePage();
  window.form.validateRooms();
  window.form.validatePrice();
})();
