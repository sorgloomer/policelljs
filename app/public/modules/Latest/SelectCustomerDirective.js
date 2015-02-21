angular.module('policellApp').directive('plSelectCustomer', function(DataService) {

  function link(scope, element, attrs) {
  }
  return {
    restrict: 'E',
    template:
    '<ui-select class="select" ng-model="name.selected" theme="bootstrap">' +
      '<ui-select-match placeholder="Keresés keresztnevek között...">' +
        '{{ $select.selected }}' +
      '</ui-select-match>' +
      '<ui-select-choices repeat="name in names" refresh="searchNames($select.search)" refresh-delay="400">' +
        '<small ng-bind-html="name | highlight: $select.search"></small>' +
      '</ui-select-choices>' +
    '</ui-select>'
  };
});