angular.module('policellApp').controller('NewCustomerController', function(
  $scope, HeaderService
) {
  HeaderService.notify('customers/new');

  $scope.customer = {
    name: '',
    controller: ''
  };
});
