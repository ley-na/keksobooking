'use strict';

(function () {
  var typeSelect = window.form.filters.querySelector('#housing-type');
  // var priceSelect = window.form.filters.querySelector('#housing-price');
  // var roomsSelect = window.form.filters.querySelector('#housing-rooms');
  // var guestsSelect = window.form.filters.querySelector('#housing-guests');
  // var featuresChoice = window.form.filters.querySelector('#housing-features');

  typeSelect.addEventListener('change', function () {
    var typeValue = typeSelect.value;
    var filteredOffers = window.offers.filter(function (offer) {
      if (typeValue === 'any') {
        return true;
      }
      return typeValue === offer.offer.type;
    });
    window.pin.render(filteredOffers);
    window.offerCard.elements.style.display = 'none';
  });
})();
