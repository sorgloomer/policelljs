angular.module('policellApp').controller('HeaderController', function(
  $scope, NavigationService, models, DataService
) {
  $scope.isPage = NavigationService.isPage;
  $scope.openPage = NavigationService.openPage;
  $scope.models = models;
  $scope.isAdmin = false;

  DataService.isAdmin().then(function(a) {
    $scope.isAdmin = a;
  });
});
