angular.module('policellApp').directive('plSelectCustomer', function(DataService, $compile) {
  var TEMPLATE =
  '<ui-select class="select" theme="bootstrap">' +
  '<ui-select-match>' +
  '{{ $select.selected }}' +
  '</ui-select-match>' +
  '<ui-select-choices repeat="name in names" refresh="searchNames($select.search)" refresh-delay="400">' +
  '<small ng-bind-html="name | highlight: $select.search"></small>' +
  '</ui-select-choices>' +
  '</ui-select>';

  function link(scope, element, attrs) {
    console.log(attrs);
    var elem = angular.element(TEMPLATE);
    elem.attr('ng-model', attrs.ngModel);
    elem.addClass('class', attrs.class);
    elem.children().eq(0).attr('placeholder', attrs.placeholder);
    elem = $compile(elem)(scope);
    element.replaceWith(elem);
  }
  return {
    restrict: 'E',
    link: link
  };
});