angular.module('policellApp').directive("fileread", function () {

  var EVENTS = ["change", "drop"];

  function link(scope, element, attrs) {
    function handleEvent(event) {
      scope.$apply(function() {
        scope.$eval(attrs.fileread, {
          $event: event
        });
      });
    }
    EVENTS.forEach(function(e) {
      element.on(e, handleEvent);
    });
    scope.$on('$destroy', function() {
      EVENTS.forEach(function(e) {
        element.off(e, handleEvent);
      });
    })
  }
  return {
    scope: true,
    link: link
  }
});