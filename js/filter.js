'use strict';

(function () {
  var typeSelect = window.form.filters.querySelector('#housing-type');

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
