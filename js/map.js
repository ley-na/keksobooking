'use strict';

(function () {

  var resetFormButton = window.form.ad.querySelector('.ad-form__reset');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  // Спрятать карту
  var disablePage = function () {
    window.pin.map.classList.add('map--faded');
    window.form.ad.classList.add('ad-form--disabled');
    window.form.filters.classList.add('hidden');
    window.pin.clear();
    window.form.disableElements(window.form.adFieldsets);
    window.form.disableElements(window.form.filterElements);
    window.pin.setDefaultPosition();
    document.addEventListener('keydown', onPinPress);
    window.form.mainPin.addEventListener('mousedown', onPinMousedown);
    window.form.ad.reset();
    window.form.filters.reset();
    window.form.setAddressDisabled();
    window.card.elements.classList.add('hidden');
  };

  // Показать карту
  var enablePage = function () {
    window.pin.map.classList.remove('map--faded');
    window.form.ad.classList.remove('ad-form--disabled');
    window.form.filters.classList.remove('hidden');
    window.form.setAddressEnabled();
    window.form.enableElements(window.form.adFieldsets);
    window.form.enableElements(window.form.filterElements);
    document.removeEventListener('keydown', onPinPress);
    window.form.mainPin.removeEventListener('mousedown', onPinMousedown);
    window.backend.load(onSuccessLoad, onErrorLoad);
  };

  var onPinPress = function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      enablePage();
    }
  };

  var onPinMousedown = function (evt) {
    if (evt.button === 0) {
      enablePage();
    }
  };

  var onErrorEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
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
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('click', onErrorButtonClick);
  };

  var showError = function (errorMessage) {
    var errorElement = errorMessageTemplate.cloneNode(true);

    var messageText = errorElement.querySelector('.error__message');
    messageText.textContent = errorMessage;

    var message = main.appendChild(errorMessageTemplate);
    var errorButton = message.querySelector('.error__button');

    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorClick);
    errorButton.addEventListener('click', onErrorButtonClick);
  };

  // Сообщение успеха
  var onSuccessEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      closeSuccess();
    }
  };

  var onSuccessClick = function (evt) {
    if (evt.target === document.querySelector('div.success')) {
      evt.preventDefault();
      closeSuccess();
    }
  };

  var closeSuccess = function () {
    document.querySelector('div.success').remove();
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', onSuccessClick);
    disablePage();
  };

  var showSuccess = function (successMessage) {
    var successElement = successMessageTemplate.cloneNode(true);

    var messageText = successElement.querySelector('.success__message');
    messageText.textContent = successMessage;

    main.appendChild(successMessageTemplate);

    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessClick);
  };

  // События успешной и неуспешной загрузки данных
  var onSuccessLoad = function (data) {
    window.pin.render(data);
    window.offers = data;
  };

  var onErrorLoad = function (message) {
    showError(message);
  };

  var onSuccessUpload = function () {
    showSuccess();
  };

  var onErrorUpload = function (message) {
    showError(message);
  };

  window.form.ad.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.form.ad), onSuccessUpload, onErrorUpload);
  });

  resetFormButton.addEventListener('click', function () {
    disablePage();
  });

  disablePage();
  window.form.validateRooms();
  window.form.validatePrice();
})();
