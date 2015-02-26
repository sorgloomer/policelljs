angular.module('policellApp').controller('AdminController', function(
  $scope, $load, DataService, HeaderService
) {
  HeaderService.notify('admin');
  $scope.rebuild = function() {

  };

});
