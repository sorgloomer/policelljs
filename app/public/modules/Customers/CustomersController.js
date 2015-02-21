angular.module('policellApp').controller('CustomersController', function(
  $q, $qfcall, $qfapply, $scope, DataService, $load, debounce, HeaderService
) {
  HeaderService.notify('customers');

  $scope.customers = [];
  $scope.searchText = '';

  $scope.refresh = function() {
    $load(DataService.getLatestCustomers().then(function(newData) {
      $scope.customers = newData;
    }));
  };


  function decorateLoader(fn) {
    return function() {
      return $load(fn.apply(this, arguments));
    }
  }
  function decorateFcall(fn) {
    return function() {
      var _this = this, _arguments = arguments;
      return $qfapply(function() {
        return fn.apply(_this, _arguments);
      });
    }
  }

  function loadAndInter(fn) {
    return debounce(decorateLoader(decorateFcall(fn)), 300);
  }

  $scope.fetchSearch = loadAndInter(function(text) {
    console.log(text);
    return DataService.findCustomers(text).then(function(newData) {
      $scope.customers = newData;
    });
  });

  $scope.notifySearch = function() {
    $scope.fetchSearch($scope.searchText);
  };

  $scope.newCustomer = function() {
    HeaderService.openPage('customers/new');
  };

  $scope.editCustomer = function(customer) {
    HeaderService.openPage('customers/edit/' + customer.id);
  };



  $scope.refresh();
});
