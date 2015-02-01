angular.module('policellApp')
.controller('WelcomeController', function($q, $scope, WelcomeService) {
  function $done(p) {
    $q.when(p, null, function(e) {
      console.error(e);
    });
  }
  function $finally(p, fn) {
    var success = false, value = null;
    return $q.when(p, function(r) {
      success = true; value = r;
      return fn(success, value);
    }, function(e) {
      success = false; value = e;
      return fn(success, value);
    }).then(function() {
      return success ? value : $q.reject(value);
    });
  }

  $scope.gridOptions = {
    data: 'myData',
    enableColumnResize: true,
    enableColumnReordering: true,
    enablePinning: true,
    enableCellEdit: true,
    multiSelect: false,
    
    headerRowHeight: 24,
    rowHeight: 22,
    
    columnDefs: [
      { field: 'id',    displayName: 'id'      , width: 50 , index: 1 },
      { field: 'info',  displayName: 'Info'    , width: 50 , index: 0 },
      { field: 'age',   displayName: 'Életkor' , index: 2 }
    ]
  };
  
  $scope.myData = [];
    
  $scope.columns = null;

  $scope.refresh = function() {
    WelcomeService.getData().then(function(x) { $scope.myData = x; });
  };
  $scope.add = function() {
    $done(
      $finally(
        WelcomeService.addData(),
        $scope.refresh
      )
    );  
  };
  
  $scope.$on('ngGridEventColumns', function(evt, newColumns){
    $scope.columns = newColumns;
  });
  $scope.$on('ngGridEventEndCellEdit', function(event) {
    var scp = event.targetScope;
    $done(WelcomeService.setData(scp.row.entity, scp.col.field));
  });
  
  $scope.refresh();
  
});
