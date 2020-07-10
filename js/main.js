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

var OFFER_PHOTO_WIDTH = 45;
var OFFER_PHOTO_HEIGHT = 40;
var OFFER_PHOTO_ALT = 'Фотография жилья';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var LOCATION_X_MIN = 0;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var locationXMax = document.querySelector('.map').offsetWidth;

var map = document.querySelector('.map');

var offerCardTemplate = document.querySelector('#card').content.querySelector('.popup');
var offerCardElements = offerCardTemplate.cloneNode(true);
var offerCardPhotos = offerCardElements.querySelector('.popup__photos');
var offerCardFeatures = offerCardElements.querySelector('.popup__features');

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

// Показ карты
var showMap = function () {
  map.classList.remove('map--faded');
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

var renderFeatures = function (container, features) {
  container.innerHTML = '';
  var fragment = document.createDocumentFragment();
  features.forEach(function (feature) {
    var offerCardFeature = document.createElement('li');
    fragment.appendChild(offerCardFeature);
    offerCardFeature.classList.add('popup__feature', 'popup__feature--' + feature);
  });
};

var renderPhotos = function (container, photos) {
  container.innerHTML = '';
  var fragment = document.createDocumentFragment();
  photos.forEach(function (photo) {
    var offerCardPhoto = document.createElement('img');
    fragment.appendChild(offerCardPhoto);
    offerCardPhoto.classList.add('popup__photo');
    offerCardPhoto.src = photo;
    offerCardPhoto.alt = OFFER_PHOTO_ALT;
    offerCardPhoto.width = OFFER_PHOTO_WIDTH;
    offerCardPhoto.height = OFFER_PHOTO_HEIGHT;
    container.appendChild(offerCardPhoto);
  });
};

// Типы жилья
var roomTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

// Подбор окончаний у комнат
var switchRooms = function (digit) {
  switch (digit) {
    case 1:
      return digit + ' комната';
    case 2:
    case 3:
    case 4:
      return digit + ' комнаты';
    default:
      return digit + ' комнат';
  }
};

// Подбор окончаний у гостей
var switchGuests = function (digit) {
  switch (digit) {
    case 1:
      return digit + ' гостя';
    default:
      return digit + ' гостей';
  }
};

// Функция добавляения элемента в карточку при наличии
var addCardElementStyle = function (offerElement, selector) {
  if (offerElement) {
    offerCardElements.querySelector(selector).textContent = offerElement;
  } else {
    hideOfferCardElement(selector);
  }
};

// Функция добавляения элемента в карточку при наличии с массивом
var addCardElementsArray = function (offerElement, container, renderFunction) {
  if (offerElement) {
    renderFunction(container, offerElement);
  } else {
    container.style.display = 'none';
  }
};

// Функция добавления цены
var addCardElementPrice = function (offerElement, selector) {
  if (offerElement) {
    offerCardElements.querySelector(selector).textContent = offerElement + '₽/ночь';
  } else {
    hideOfferCardElement(selector);
  }
};

// Функция добавления комнат и гостей
var addCardElementCapacity = function (offerElementRooms, offerElementGuests, selector) {
  if (offerElementRooms && offerElementGuests) {
    offerCardElements.querySelector(selector).textContent = switchRooms(offerElementRooms) + ' для ' + switchGuests(offerElementGuests);
  } else {
    hideOfferCardElement(selector);
  }
};

// Функция добавления аватара
var addCardElementAvatar = function (offerElement, selector) {
  if (offerElement) {
    offerCardElements.querySelector(selector).src = offerElement;
  } else {
    hideOfferCardElement(selector);
  }
};

// Функция добавления типа жилья
var addCardElementType = function (offerElement, selector) {
  if (offerElement) {
    offerCardElements.querySelector(selector).textContent = roomTypes[offerElement];
  } else {
    hideOfferCardElement(selector);
  }
};

// Функция добавления времени
var addCardElementTimes = function (offerElementCheckin, offerElementCheckOut, selector) {
  if (offerElementCheckin && offerElementCheckOut) {
    offerCardElements.querySelector(selector).textContent = 'Заезд после ' + offerElementCheckin + ', выезд до ' + offerElementCheckOut;
  } else {
    hideOfferCardElement(selector);
  }
};

// Функция скрытия элемента
var hideOfferCardElement = function (selector) {
  offerCardElements.querySelector(selector).style.display = 'none';
};

// Генерирование карточки объявления
var renderOfferCard = function (offerCard) {

  addCardElementStyle(offerCard.offer.title, '.popup__title');
  addCardElementStyle(offerCard.offer.address, '.popup__text--address');
  addCardElementStyle(offerCard.offer.description, '.popup__description');
  addCardElementPrice(offerCard.offer.price, '.popup__text--price');
  addCardElementType(offerCard.offer.type, '.popup__type');

  addCardElementsArray(offerCard.offer.features, offerCardFeatures, renderFeatures);
  addCardElementsArray(offerCard.offer.photos, offerCardPhotos, renderPhotos);

  addCardElementCapacity(offerCard.offer.rooms, offerCard.offer.guests, '.popup__text--capacity');
  addCardElementTimes(offerCard.offer.checkin, offerCard.offer.checkout, '.popup__text--time');

  addCardElementAvatar(offerCard.author.avatar, '.popup__avatar');

  map.insertBefore(offerCardElements, map.querySelector('.map__filters-container'));
};

var offers = generateOffers(OFFERS_NUMBER);
renderOfferPins(offers);
showMap();

renderOfferCard(offers[0]);
