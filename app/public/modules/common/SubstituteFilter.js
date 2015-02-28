angular.module('policellApp').filter('substitute', function(
) {

  function substitute(pattern) {
    var args = arguments;
    return (''+pattern).replace(/\{([^}]*)\}/g, function(m) {
      return args[((+m[1]) || 0) + 1];
    });
  }

  return substitute;
});
