'use strict';

(function () {

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
    renderFeatures: renderFeatures,
    renderPhotos: renderPhotos,
    roomTypes: roomTypes,
    locationYMin: LOCATION_Y_MIN,
    locationYMax: LOCATION_Y_MAX,
    loactionXMin: LOCATION_X_MIN,
    locationXMax: locationXMax
  };
})();
