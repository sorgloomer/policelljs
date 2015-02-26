angular.module('policellApp').controller('HeaderController', function(
  $scope, HeaderService, models, DataService
) {
  $scope.isPage = HeaderService.isPage;
  $scope.openPage = HeaderService.openPage;
  $scope.models = models;
  $scope.isAdmin = false;

  DataService.isAdmin().then(function(a) {
    $scope.isAdmin = a;
  });
});
