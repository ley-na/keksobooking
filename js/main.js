'use strict';

var OFFER_TITLES = ['Лучшее место для отдыха вдвоём', 'Квартира с видом на море', 'Студия в центре', 'Для большой семьи'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_INS = ['12:00', '13:00', '14:00'];
var CHECK_OUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Второе описание', 'Третье описание'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFERS_NUMBER = 8;
var OFFER_ROOMS = [1, 2, 3, 100];
var OFFER_GUESTS = [1, 2, 3, 0];

var PRICE_MAX = 400000;

// var OFFER_PHOTO_WIDTH = 45;
// var OFFER_PHOTO_HEIGHT = 40;
// var OFFER_PHOTO_ALT = 'Фотография жилья';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_ACTIVE_HEIGHT = 84;

var LOCATION_X_MIN = 0;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

// // Типы жилья
// var roomTypes = {
//   palace: 'Дворец',
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало'
// };

var locationXMax = document.querySelector('.map').offsetWidth;

var map = document.querySelector('.map');

// var offerCardTemplate = document.querySelector('#card').content.querySelector('.popup');
// var offerCardElements = offerCardTemplate.cloneNode(true);
// var offerCardPhotos = offerCardElements.querySelector('.popup__photos');
// var offerCardFeatures = offerCardElements.querySelector('.popup__features');

var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var filtersForm = document.querySelector('.map__filters');
var addressInput = adForm.querySelector('input[name="address"]');
var titleInput = adForm.querySelector('input[name="title"]');

// var typeInput = adForm.querySelector('input[name="type"]');
// var priceInput = adForm.querySelector('input[name="price"]');
// var checkinSelect = adForm.querySelector('select[name="timein"]');
// var checkoutSelect = adForm.querySelector('select[name="timeout"]');
var roomsSelect = adForm.querySelector('select[name="rooms"]');
var capacitySelect = adForm.querySelector('select[name="capacity"]');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);

};

var getRandomElement = function (items) {
  var randomIndex = getRandomNumber(0, items.length - 1);
  return items[randomIndex];
};

// Перемешивание массива
var shuffleItems = function (items) {
  var itemsClone = items.slice();
  for (var i = 0; i < itemsClone.length; i++) {
    var swapIndex = getRandomNumber(0, items.length - 1);

    var currentItem = itemsClone[i];
    itemsClone[i] = itemsClone[swapIndex];
    itemsClone[swapIndex] = currentItem;
  }
  return itemsClone;
};

var shuffleAndSliceItems = function (items) {
  var shuffledItems = shuffleItems(items);
  return shuffledItems.slice(0, getRandomNumber(1, items.length));
};

// Генерирование элементов
var generateOffers = function (size) {
  var offers = [];
  for (var i = 1; i <= size; i++) {
    var locationX = getRandomNumber(LOCATION_X_MIN, locationXMax);
    var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var offer = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: getRandomElement(OFFER_TITLES),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(0, PRICE_MAX),
        type: getRandomElement(OFFER_TYPES),
        rooms: getRandomElement(OFFER_ROOMS),
        guests: getRandomElement(OFFER_GUESTS),
        checkin: getRandomElement(CHECK_INS),
        checkout: getRandomElement(CHECK_OUTS),
        features: shuffleAndSliceItems(OFFER_FEATURES),
        description: getRandomElement(OFFER_DESCRIPTIONS),
        photos: shuffleAndSliceItems(OFFER_PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    offers.push(offer);
  }
  return offers;
};

// Отрисовка метки объявления
var renderOfferPin = function (offerPin) {
  var offerPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var offerPinElement = offerPinTemplate.cloneNode(true);

  offerPinElement.querySelector('img').src = offerPin.author.avatar;
  offerPinElement.querySelector('img').alt = offerPin.offer.title;
  offerPinElement.style.left = offerPin.location.x - PIN_WIDTH / 2 + 'px';
  offerPinElement.style.top = offerPin.location.y - PIN_HEIGHT + 'px';

  return offerPinElement;
};

// Добавление метки в разметку
var renderOfferPins = function (offers) {
  var mapPins = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  offers.forEach(function (offer) {
    fragment.appendChild(renderOfferPin(offer));
  });
  mapPins.appendChild(fragment);
};

// Очистить пины
var clearPins = function () {
  var renderedPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  renderedPins.forEach(function (pin) {
    pin.remove();
  });
};

// var renderFeatures = function (container, features) {
//   container.innerHTML = '';
//   var fragment = document.createDocumentFragment();
//   features.forEach(function (feature) {
//     var offerCardFeature = document.createElement('li');
//     fragment.appendChild(offerCardFeature);
//     offerCardFeature.classList.add('popup__feature', 'popup__feature--' + feature);
//   });
// };

// var renderPhotos = function (container, photos) {
//   container.innerHTML = '';
//   var fragment = document.createDocumentFragment();
//   photos.forEach(function (photo) {
//     var offerCardPhoto = document.createElement('img');
//     fragment.appendChild(offerCardPhoto);
//     offerCardPhoto.classList.add('popup__photo');
//     offerCardPhoto.src = photo;
//     offerCardPhoto.alt = OFFER_PHOTO_ALT;
//     offerCardPhoto.width = OFFER_PHOTO_WIDTH;
//     offerCardPhoto.height = OFFER_PHOTO_HEIGHT;
//     container.appendChild(offerCardPhoto);
//   });
// };

// // Функция добавляения элемента в карточку при наличии
// var addFieldToCardElement = function (value, selector, suffix) {
//   if (value) {
//     offerCardElements.querySelector(selector).textContent = value + suffix;
//   } else {
//     hideOfferCardElement(selector);
//   }
// };

// // Функция добавляения элемента в карточку при наличии с массивом
// var addCardElementsArray = function (value, container, renderFunction) {
//   if (value.length > 0) {
//     renderFunction(container, value);
//   } else {
//     container.classList.add('hidden');
//   }
// };

// // Функция добавления комнат и гостей
// var addCardElementCapacity = function (valueRooms, valueGuests, selector) {
//   if (valueRooms && valueGuests) {
//     offerCardElements.querySelector(selector).textContent = valueRooms + ' комнат для ' + valueGuests + ' гостей';
//   } else {
//     hideOfferCardElement(selector);
//   }
// };

// // Функция добавления аватара
// var addCardElementAvatar = function (value, selector) {
//   if (value) {
//     offerCardElements.querySelector(selector).src = value;
//   } else {
//     hideOfferCardElement(selector);
//   }
// };

// // Функция добавления типа жилья
// var addCardElementType = function (value, selector) {
//   if (value) {
//     offerCardElements.querySelector(selector).textContent = roomTypes[value];
//   } else {
//     hideOfferCardElement(selector);
//   }
// };

// // Функция добавления времени
// var addCardElementTimes = function (valueCheckin, valueCheckOut, selector) {
//   if (valueCheckin && valueCheckOut) {
//     offerCardElements.querySelector(selector).textContent = 'Заезд после ' + valueCheckin + ', выезд до ' + valueCheckOut;
//   } else {
//     hideOfferCardElement(selector);
//   }
// };

// // Функция скрытия элемента
// var hideOfferCardElement = function (selector) {
//   offerCardElements.querySelector(selector).classList.add('hidden');
// };

// // Генерирование карточки объявления
// var renderOfferCard = function (offerCard) {
//   addFieldToCardElement(offerCard.offer.title, '.popup__title', '');
//   addFieldToCardElement(offerCard.offer.address, '.popup__text--address', '');
//   addFieldToCardElement(offerCard.offer.description, '.popup__description', '');
//   addFieldToCardElement(offerCard.offer.price, '.popup__text--price', '₽/ночь');
//   addCardElementType(offerCard.offer.type, '.popup__type');

//   addCardElementsArray(offerCard.offer.features, offerCardFeatures, renderFeatures);
//   addCardElementsArray(offerCard.offer.photos, offerCardPhotos, renderPhotos);

//   addCardElementCapacity(offerCard.offer.rooms, offerCard.offer.guests, '.popup__text--capacity');
//   addCardElementTimes(offerCard.offer.checkin, offerCard.offer.checkout, '.popup__text--time');

//   addCardElementAvatar(offerCard.author.avatar, '.popup__avatar');

//   map.insertBefore(offerCardElements, map.querySelector('.map__filters-container'));
// };

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

var disablePage = function () {
  insertDefaultAddressDisabled();
  disableFormElements(adFormFieldsets);
  disableFormElements(filtersFormElements);
  mainPin.addEventListener('keydown', onPinPress);
  mainPin.addEventListener('mousedown', onPinMousedown);
  clearPins();
};

// Показать карту
var enablePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  insertDefaultAddressEnabled();
  renderOfferPins(offers);
  enableFormElements(adFormFieldsets);
  enableFormElements(filtersFormElements);
  mainPin.removeEventListener('keydown', onPinPress);
  mainPin.removeEventListener('mousedown', onPinMousedown);
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

// Сообщения при валидации заголовка
titleInput.addEventListener('input', function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Название слишком короткое. Введите не меньше 30 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Название сдишком длинное. Введите не больше 100 символов');
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

capacitySelect.addEventListener('change', onCapacityChange);
roomsSelect.addEventListener('change', onCapacityChange);

var offers = generateOffers(OFFERS_NUMBER);

disablePage();
// renderOfferCard(offers[0]);
validateRooms();
