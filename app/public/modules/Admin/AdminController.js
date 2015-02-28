angular.module('policellApp').controller('AdminController', function(
  $scope, $load, DataService, NavigationService
) {
  NavigationService.notify('admin');
  $scope.rebuild = function() {

  };

});
