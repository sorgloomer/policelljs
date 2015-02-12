angular.module('policellApp')
.directive('ngModel2', function($compile) {
  function changer(attr) {
    return 'onuser.' + attr + '(' + attr + ",'" + attr + "')";
  }
  function link(scope, element, attrs) {
    element.removeAttr('ng-model2');
    element.removeAttr('data-ng-model2');
    element.attr('ng-model', attrs.ngModel2);
    element.attr('ng-change', changer(attrs.ngModel2));
    $compile(element)(scope);
  }
  return {
    restrict: 'A',
    replace: false,
    terminal: true,
    priority: 1000,
    link: link
  };
})
.factory('i18n', function($rootScope) {
  var currentLocale = '', S = null;
  var i18n = {
    loc: {},
    defaultLocale: 'en',
    usedLocale: '',
    locale: locale, strings: strings,
    S: S, d: d, m: m
  };
  function d(loc, key, val) {
    var cloc = i18n.loc[loc];
    if (val === undefined) {
      return cloc ? cloc[key] : undefined;
    }
    if (!cloc) {
      i18n.loc[loc] = cloc = {};
    }
    cloc[key] = val;
    return i18n;
  }
  function m(loc, keyvals) {
    var cloc = i18n.loc[loc];
    if (!cloc) {
      i18n.loc[loc] = cloc = {};
    }
    angular.forEach(keyvals, function(v, k) {
      cloc[k] = v;
    });
    return i18n;
  }
  function localeInternal(name) {
    if (name && i18n.loc[name]) {
      strings(i18n.loc[name]);
      i18n.userLocale = name;
      return true;
    }
    return false;
  }
  function strings(obj) {
    if (obj === undefined) return S;
    $rootScope.S = i18n.S = S = obj;
    return i18n;
  }
  function locale(name) {
    if (name === undefined) return currentLocale;
    currentLocale = name;
    
    if (localeInternal(name)) return;
    if (localeInternal(name.split('-')[0])) return;
    if (localeInternal(i18n.defaultLocale)) return;
    return i18n;
  }
  $rootScope.S = i18n.S = S;
  return i18n;  
})
.factory('$call', function() {
  var slice = Array.prototype.slice;
  return function $call(fn /*, ...args */) {
    if (typeof fn === 'function') {
      return fn.apply(null, slice.call(arguments, 1));
    }
  };
})
.factory('$finally', function($q) {
  return function $finally(p, fn) {
    var success = true, value = null;
    return $q.when(p, function(r) {
      success = true; value = r;
      return fn(success, value);
    }, function(e) {
      success = false; value = e;
      return fn(success, value);
    }).then(function() {
      return success ? $q.when(value) : $q.reject(value);
    });
  };
})
.factory('$error', function($q) {
  return function $error(e) {
    console.error(e);
  };
})
.factory('$done', function($q, $error, $call) {
  return function $done(p, fn) {
    $q.when(p, function(r) {
      try {
        $call(fn, true, r);
      } catch(e) {
        $error(e);
      }
    }, function(e) {
      $error(e);
      try {
        $call(fn, false, e);
      } catch(e2) {
        $error(e2);
      }
    });
  };
})
.factory('$load', function($q, $done, $call, $rootScope) {  
  function make(scope, field) {
    if (field === undefined) field = 'loading';
    scope[field] = false;
    var loadCount = 0;
    return function $load(p, fn) {
      ++loadCount;
      scope[field] = true;
      $done(p, function(s, v) {
        if (!(--loadCount)) scope[field] = false;
        $call(fn, s, v);
      });
    };
  }
  var $load = make($rootScope);
  $load.make = make;
  return $load;
})
.directive('myDateCellEditor', function() {
  function link(scope, element, attrs) {
    scope.emitEditEnd = function() {
      scope.$emit('ngGridEventEndCellEdit');
    };
    scope.$on('ngGridEventStartCellEdit', function () {
      console.log('start');
      element = element.children();
      element.focus();
      element.select();
    });
  }
  return {
    restrict: 'E',
    template: '<input type="text" data-type="date" ui-date="{dateFormat:S.date_sf,onClose:emitEditEnd}" class="form-control" ng-model="row.entity[col.field]"/>',
    link: link
  };
})
.controller('WelcomeController', function($q, $scope, $load, WelcomeService, i18n) {
  i18n.m('hu', {
    date_sf: 'yy-mm-dd',
    date_lf: 'yyyy-MM-dd'
  });
  i18n.locale('hu');
 
  $scope.name = { selected: null };
  
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
      { field: 'id',    displayName: 'id'      , width: 40  , index: 1 },
      { field: 'info',  displayName: 'Szöveg'  , width: 200 , index: 0 },
      { field: 'age',   displayName: 'Szám'    , index: 2,
        editableCellTemplate: '<input type="number" class="form-control" ng-input ng-model="COL_FIELD" />'
      },
      {
        field: 'date',  displayName: 'Dátum'   , index: 3,
        cellFilter: 'date:S.date_lf',
        editableCellTemplate: '<my-date-cell-editor/>'
      }
    ]
  };
  
  $scope.myData = [];
  $scope.names = [];
  
    
  $scope.columns = null;

  
  WelcomeService.getNames().then(function(r) { $scope.names = r; });
  $scope.searchNames = function(part) {
    $load(WelcomeService.searchNames(part).then(function(r) { $scope.names = r; }));
  };
  
  $scope.refresh = function() {
    $load(WelcomeService.getData().then(function(x) { $scope.myData = x; }));
  };
  $scope.add = function() {
    $load(WelcomeService.addData(), $scope.refresh);  
  };
    
  $scope.$on('ngGridEventColumns', function(evt, newColumns){
    $scope.columns = newColumns;
  });
  $scope.$on('ngGridEventEndCellEdit', function(event) {
    var scp = event.targetScope;
    $load(WelcomeService.setData(scp.row.entity, scp.col.field));
  });
  
  $scope.num1 = 0;
  $scope.num2 = 0;
  
   $scope.onuser = {
    num1: function(v) {
      $scope.num2 = v + 1;
    },
    num2: function(v) {
      $scope.num1 = v + 1;
    }
  };
  
  $scope.refresh();
});
