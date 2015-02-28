angular.module('policellApp').controller('EditOfferController', function(
  NavigationService, models
) {
  NavigationService.notify('offers/edit');

  models.editOffer = {};

});
