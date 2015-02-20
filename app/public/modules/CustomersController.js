angular.module('policellApp').controller('CustomersController', function(
  $q, $qfcall, $qfapply, $scope, DataService, $load
) {

  $scope.customers = [];
  $scope.searchText = '';

  $scope.refresh = function() {
    $load(DataService.getLatestCustomers().then(function(newData) {
      $scope.customers = newData;
    }));
  };


  function Interleaver() {
    var queued = null;
    function finishOne() {
      interleave.working = false;
      if (queued) {
        invoke();
      } else {
        interleave.working = false;
      }
    }
    function invoke() {
      var q = queued;
      interleave.working = true;
      queued = null;
      var prom = $qfapply(q);
      prom.finally(finishOne);
    }
    function interleave(fn) {
      queued = fn;
      if (!interleave.working) invoke();
    }
    interleave.working = false;
    return interleave;
  }


  function interleave(fn) {
    var interleaver = Interleaver($load);
    return function(/* arguments */) {
      var _arguments = arguments, _this = this;
      return interleaver(function() {
        return fn.apply(_this, _arguments);
      });
    }
  }
  function decorateLoader(fn) {
    return function() {
      return $load(fn.apply(this, arguments));
    }
  }
  function decorateFcall(fn) {
    return function() {
      var _this = this, _arguments = arguments;
      return $qfapply(function() {
        return fn.apply(_this, _arguments);
      });
    }
  }

  function loadAndInter(fn) {
    return interleave(decorateLoader(decorateFcall(fn)));
  }

  $scope.fetchSearch = loadAndInter(function(text) {
    console.log(text);
    return DataService.findCustomers(text).then(function(newData) {
      $scope.customers = newData;
    });
  });

  $scope.notifySearch = function() {
    $scope.fetchSearch($scope.searchText);
  };



  $scope.refresh();
});
