angular.module('policellApp').controller('NewOfferController', function(
  $scope, models, NavigationService, util
) {
  NavigationService.notify('offers/new');

  function init() {
    if (models.newOffer) {
      $scope.offer = models.newOffer;
    } else {
      $scope.clear();
    }
  }

  $scope.clear = function() {
    $scope.offer = models.newOffer = {
      registration_date: new Date(),
      product_properties: '',
      comment: '',
      cost_per_weight: 10,
      cost_per_piece: 10,
      weight_per_piece: 1,
      cost_currency: 'HUF'
    };
  };

  $scope.save = function() {
    throw new Error('TODO unimplemented');
  };

  $scope.cancel = function() {
    models.newOffer = null;
    NavigationService.openPage('offers');
  };

  function trim(s) {
    return ('' + s).trim();
  }
  function contains(arr, v) {
    return arr.indexOf(v) >= 0;
  }
  function splitByComa(str) {
    return str ? str.split(',') : [];
  }
  $scope.addProperty = function(v) {
    v = '' + v;
    var items = splitByComa($scope.offer.product_properties).map(trim);
    if (!contains(items, v)) {
      $scope.offer.product_properties +=
        (items.length > 0 ? ', ' : '') + v;
    }
  };

  $scope.calcCostPerWeight = function() {
    $scope.offer.cost_per_weight = $scope.offer.cost_per_piece / $scope.offer.weight_per_piece;
  };

  $scope.calcCostPerPiece = function() {
    $scope.offer.cost_per_piece = $scope.offer.cost_per_weight * $scope.offer.weight_per_piece;
  };

  $scope.util = util;
  $scope.iname = function(v) {
    var result = '';
    for (var i = 0; i < v/2 + 10; i++) {
      result += String.fromCharCode(i + 'a'.charCodeAt(0));
    }
    return result;
  };

  init();
});
