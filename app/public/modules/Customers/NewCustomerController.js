angular.module('policellApp').controller('NewCustomerController', function(
  $scope, HeaderService, DataService
) {
  HeaderService.notify('customers/new');

  $scope.customer = {
    name: '',
    comment: ''
  };

  $scope.saveCustomer = function() {
    DataService.addCustomer({
      name: $scope.customer.name,
      comment: $scope.customer.comment
    }).finally(function() {
      HeaderService.openPage('customers');
    });
  };
});
