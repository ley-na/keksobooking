'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var PRICE_LOW = 'low';
  var PRICE_MIDLE = 'middle';
  var PRICE_HIGH = 'high';

  var typeSelect = window.form.filters.querySelector('#housing-type');
  var priceSelect = window.form.filters.querySelector('#housing-price');
  var roomsSelect = window.form.filters.querySelector('#housing-rooms');
  var guestsSelect = window.form.filters.querySelector('#housing-guests');
  var featuresChoice = window.form.filters.querySelector('#housing-features');

  var filterByType = function (offerParameter) {
    return typeSelect.value === DEFAULT_VALUE || typeSelect.value === offerParameter;
  };

  var PriceRange = {
    MIN: 10000,
    MAX: 50000
  };

  var filterByPrice = function (offerParameter) {
    var priceValue = priceSelect.value;
    switch (priceValue) {
      case PRICE_LOW:
        return offerParameter <= PriceRange.MIN;
      case PRICE_MIDLE:
        return offerParameter > PriceRange.MIN && offerParameter < PriceRange.MAX;
      case PRICE_HIGH:
        return offerParameter >= PriceRange.MAX;
      default:
        return true;
    }
  };

  var filterByRooms = function (offerParameter) {
    return roomsSelect.value === DEFAULT_VALUE || roomsSelect.value === String(offerParameter);
  };

  var filterByGuests = function (offerParameter) {
    return guestsSelect.value === DEFAULT_VALUE || guestsSelect.value === String(offerParameter);
  };

  var filterByFeatures = function (offerParameter) {
    var checkedFeatures = Array.from(featuresChoice.querySelectorAll('input:checked'));
    return checkedFeatures.every(function (feature) {
      return offerParameter.includes(feature.value);
    });
  };

  var filterOffers = function (offers) {
    return offers.filter(function (offer) {
      return filterByType(offer.offer.type) && filterByPrice(offer.offer.price) && filterByRooms(offer.offer.rooms) && filterByGuests(offer.offer.guests) && filterByFeatures(offer.offer.features);
    });
  };

  var onFilterChange = function () {
    window.debounce(function () {
      var filteredOffers = filterOffers(window.offers);
      window.pin.render(filteredOffers);
      window.card.elements.classList.add('hidden');
    })();
  };

  window.filter = {
    onChange: onFilterChange
  };
})();
