angular.module('policellApp').controller('AdminController', function(
  $q, $done, $scope, $load, $log, DataService, NavigationService, SdbReader
) {
  NavigationService.notify('admin');
  $scope.rebuild = function() {

  };

  $scope.handleFiles = function(e) {
    if (e.target.files.length > 0) {
      $done(SdbReader.file_to_bytes(e.target.files[0]).then(function(bytes) {
        $log.log(SdbReader.readHeader(bytes));
        $log.log(SdbReader.readRecords(bytes, -5));
      }));
    } else {
      $log.log('No files dropped');
    }
  };
});
