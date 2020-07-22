'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_ACTIVE_HEIGHT = 84;

  var mainPin = window.pin.map.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var addressInput = adForm.querySelector('input[name="address"]');
  var titleInput = adForm.querySelector('input[name="title"]');

  var typeSelect = adForm.querySelector('select[name="type"]');
  var priceInput = adForm.querySelector('input[name="price"]');
  var checkinSelect = adForm.querySelector('select[name="timein"]');
  var checkoutSelect = adForm.querySelector('select[name="timeout"]');
  var roomsSelect = adForm.querySelector('select[name="rooms"]');
  var capacitySelect = adForm.querySelector('select[name="capacity"]');

  // Вычисление адреса на формы
  var insertDefaultAddressDisabled = function () {
    var coordinateX = Math.round(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
    var coordinateY = Math.round(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);

    addressInput.value = coordinateX + ', ' + coordinateY;
  };

  var insertDefaultAddressEnabled = function () {
    var coordinateX = Math.round(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
    var coordinateY = Math.round(mainPin.offsetTop + MAIN_PIN_ACTIVE_HEIGHT);

    addressInput.value = coordinateX + ', ' + coordinateY;
  };

  // Сообщения при валидации заголовка
  titleInput.addEventListener('input', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Название слишком короткое. Введите не меньше 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Название слишком длинное. Введите не больше 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Добавьте заголовок вашему объявлению');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  // Словарь количества гостей и текстов ошибки
  var capacityRoomsError = {
    1: {
      guests: ['1'],
      errorText: 'Можно разместить только 1 гостя'
    },
    2: {
      guests: ['1', '2'],
      errorText: 'Можно разместить только 1 или 2 гостей'
    },
    3: {
      guests: ['1', '2', '3'],
      errorText: 'Можно разместить 1, 2 или 3 гостей'
    },
    100: {
      guests: ['0'],
      errorText: 'Не для гостей'
    }
  };

  // Словарь цен и типов
  var priceRoomCompliance = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var validatePrice = function () {
    priceInput.min = priceRoomCompliance[(typeSelect.value)];
    priceInput.placeholder = priceRoomCompliance[(typeSelect.value)];
  };

  var onTypeChange = function () {
    validatePrice();
  };

  var validateRooms = function () {
    var guestsCount = capacitySelect.value;
    var roomsCount = roomsSelect.value;

    if (capacityRoomsError[roomsCount].guests.includes(guestsCount)) {
      roomsSelect.setCustomValidity('');
    } else {
      roomsSelect.setCustomValidity(capacityRoomsError[roomsCount].errorText);
    }
  };

  var onCapacityChange = function () {
    validateRooms();
  };

  var onRoomChange = function () {
    validateRooms();
  };

  var onCheckInChange = function () {
    checkoutSelect.value = checkinSelect.value;
  };

  var onCheckOutChange = function () {
    checkinSelect.value = checkoutSelect.value;
  };

  // Неактивное состояние полей и активация
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var filtersFormElements = filtersForm.querySelectorAll('input, select');

  var disableFormElements = function (elements) {
    elements.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };

  var enableFormElements = function (elements) {
    elements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  capacitySelect.addEventListener('change', onCapacityChange);
  roomsSelect.addEventListener('change', onRoomChange);
  checkinSelect.addEventListener('change', onCheckInChange);
  checkoutSelect.addEventListener('change', onCheckOutChange);
  typeSelect.addEventListener('change', onTypeChange);

  window.form = {
    insertDefaultAddressDisabled: insertDefaultAddressDisabled,
    insertDefaultAddressEnabled: insertDefaultAddressEnabled,
    adFieldsets: adFormFieldsets,
    filterElements: filtersFormElements,
    ad: adForm,
    disableElements: disableFormElements,
    enableElements: enableFormElements,
    validateRooms: validateRooms,
    validatePrice: validatePrice,
    mainPin: mainPin
  };
})();
