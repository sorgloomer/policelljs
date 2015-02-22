angular.module('policellApp').controller('NewOfferController', function(
  $scope, i18n
) {

  $scope.offer = {
    registration_date: new Date()
  };
});
