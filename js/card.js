'use strict';

(function () {
  var offerCardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var offerCardElements = offerCardTemplate.cloneNode(true);
  var offerCardPhotos = offerCardElements.querySelector('.popup__photos');
  var offerCardFeatures = offerCardElements.querySelector('.popup__features');

  // Функция добавляения элемента в карточку при наличии
  var addFieldToCardElement = function (value, selector, suffix) {
    if (value) {
      offerCardElements.querySelector(selector).textContent = value + suffix;
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция добавляения элемента в карточку при наличии с массивом
  var addCardElementsArray = function (value, container, renderFunction) {
    if (value.length > 0) {
      renderFunction(container, value);
    } else {
      container.classList.add('hidden');
    }
  };

  // Функция добавления комнат и гостей
  var addCardElementCapacity = function (valueRooms, valueGuests, selector) {
    if (valueRooms && valueGuests) {
      offerCardElements.querySelector(selector).textContent = valueRooms + ' комнат для ' + valueGuests + ' гостей';
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция добавления аватара
  var addCardElementAvatar = function (value, selector) {
    if (value) {
      offerCardElements.querySelector(selector).src = value;
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция добавления типа жилья
  var addCardElementType = function (value, selector) {
    if (value) {
      offerCardElements.querySelector(selector).textContent = window.data.roomTypes[value];
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция добавления времени
  var addCardElementTimes = function (valueCheckin, valueCheckOut, selector) {
    if (valueCheckin && valueCheckOut) {
      offerCardElements.querySelector(selector).textContent = 'Заезд после ' + valueCheckin + ', выезд до ' + valueCheckOut;
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция скрытия элемента
  var hideOfferCardElement = function (selector) {
    offerCardElements.querySelector(selector).classList.add('hidden');
  };

  // Генерирование карточки объявления
  var renderOfferCard = function (offerCard) {

    addFieldToCardElement(offerCard.offer.title, '.popup__title', '');
    addFieldToCardElement(offerCard.offer.address, '.popup__text--address', '');
    addFieldToCardElement(offerCard.offer.description, '.popup__description', '');
    addFieldToCardElement(offerCard.offer.price, '.popup__text--price', '₽/ночь');
    addCardElementType(offerCard.offer.type, '.popup__type');

    addCardElementsArray(offerCard.offer.features, offerCardFeatures, window.data.renderFeatures);
    addCardElementsArray(offerCard.offer.photos, offerCardPhotos, window.data.renderPhotos);

    addCardElementCapacity(offerCard.offer.rooms, offerCard.offer.guests, '.popup__text--capacity');
    addCardElementTimes(offerCard.offer.checkin, offerCard.offer.checkout, '.popup__text--time');

    addCardElementAvatar(offerCard.author.avatar, '.popup__avatar');

    window.pin.map.insertBefore(offerCardElements, window.pin.map.querySelector('.map__filters-container'));
  };

  window.card = {
    render: renderOfferCard,
    elements: offerCardElements
  };
})();
