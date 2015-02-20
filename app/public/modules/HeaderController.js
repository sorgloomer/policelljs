angular.module('policellApp').controller('HeaderController', function(
  $scope, HeaderService
) {
  $scope.isPage = HeaderService.isPage;
  $scope.openPage = HeaderService.openPage;
  HeaderService.determinePage();
});
