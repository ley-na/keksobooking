'use strict';

(function () {
  var OFFER_TITLES = ['Лучшее место для отдыха вдвоём', 'Квартира с видом на море', 'Студия в центре', 'Для большой семьи'];
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_INS = ['12:00', '13:00', '14:00'];
  var CHECK_OUTS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Второе описание', 'Третье описание'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var OFFER_ROOMS = [1, 2, 3, 100];
  var OFFER_GUESTS = [1, 2, 3, 0];
  var PRICE_MAX = 400000;

  var OFFER_PHOTO_WIDTH = 45;
  var OFFER_PHOTO_HEIGHT = 40;
  var OFFER_PHOTO_ALT = 'Фотография жилья';

  var LOCATION_X_MIN = 0;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  // Типы жилья
  var roomTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var locationXMax = document.querySelector('.map').offsetWidth;

  // Генерирование элементов
  var generateOffers = function (size) {
    var offers = [];
    for (var i = 1; i <= size; i++) {
      var locationX = window.utils.getRandomNumber(LOCATION_X_MIN, locationXMax);
      var locationY = window.utils.getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
      var offer = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          title: window.utils.getRandomElement(OFFER_TITLES),
          address: locationX + ', ' + locationY,
          price: window.utils.getRandomNumber(0, PRICE_MAX),
          type: window.utils.getRandomElement(OFFER_TYPES),
          rooms: window.utils.getRandomElement(OFFER_ROOMS),
          guests: window.utils.getRandomElement(OFFER_GUESTS),
          checkin: window.utils.getRandomElement(CHECK_INS),
          checkout: window.utils.getRandomElement(CHECK_OUTS),
          features: window.utils.shuffleAndSliceItems(OFFER_FEATURES),
          description: window.utils.getRandomElement(OFFER_DESCRIPTIONS),
          photos: window.utils.shuffleAndSliceItems(OFFER_PHOTOS)
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

  var renderFeatures = function (container, features) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      var offerCardFeature = document.createElement('li');
      fragment.appendChild(offerCardFeature);
      offerCardFeature.classList.add('popup__feature', 'popup__feature--' + feature);
      container.appendChild(offerCardFeature);
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

  window.data = {
    generateOffers: generateOffers,
    renderFeatures: renderFeatures,
    renderPhotos: renderPhotos,
    roomTypes: roomTypes,
    locationYMin: LOCATION_Y_MIN,
    locationYMax: LOCATION_Y_MAX,
    loactionXMin: LOCATION_X_MIN,
    locationXMax: locationXMax
  };
})();
