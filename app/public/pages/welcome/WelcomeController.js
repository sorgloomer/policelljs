angular.module('policellApp')
.controller('WelcomeController', function($scope) {

	$scope.list = [1,2,3,5,7,9];
  $scope.gridOptions = {
    data: 'myData',
    enableColumnResize: true,
    enableColumnReordering: true,
    enablePinning: true,
    enableCellEdit: true,
    multiSelect: false,
    
    columnDefs: [
      { field: 'firstName', displayName: 'First Name'  , width: 50 , index: 1 },
      { field: 'lastName',  displayName: 'Last Name'   , width: 50 , index: 0 , pinned: true },
      { field: 'company',   displayName: 'Company'                 , index: 2 },
      { field: 'employed',  displayName: 'Employed'                , index: 3 }
    ]
  };
  
  var a = {
    "firstName": "Cox",
    "lastName": "Carney",
    "company": "Enormo",
    "employed": true
  };
      
  $scope.myData = [a,
    {
      "firstName": "Lorraine",
      "lastName": "Wise",
      "company": "Comveyer",
      "employed": false
    },a,
    {
      "firstName": "Nancy",
      "lastName": "Waters",
      "company": "Fuelton",
      "employed": false
    }
  ];
  
  $scope.columns = null;
  
  $scope.$on('ngGridEventColumns', function(eventObj, newColumns){
    $scope.columns = newColumns;
  });
  
});
