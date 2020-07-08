'use strict';

var OFFER_TITLES = ['Лучшее место для отдыха вдвоём', 'Квартира с видом на море', 'Студия в центре', 'Для большой семьи'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_INS = ['12:00', '13:00', '14:00'];
var CHECK_OUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Второе описание', 'Третье описание'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFERS_NUMBER = 8;
var GUESTS_MAX = 6;
var ROOMS_MAX = 10;
var PRICE_MAX = 50000;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var LOCATION_X_MIN = 0;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var locationXMax = document.querySelector('.map').offsetWidth;

var map = document.querySelector('.map');

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
  for (var i =  0; i < itemsClone.length; i++) {
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
        rooms: getRandomNumber(0, ROOMS_MAX),
        guests: getRandomNumber(0, GUESTS_MAX),
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

var offers = generateOffers(OFFERS_NUMBER);
renderOfferPins(offers);
showMap();
