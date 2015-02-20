angular.module('policellApp', [
  'ngSanitize',
  'ngRoute',
  'ngGrid',
  'ui.date',
  'ui.select'
]).config(function($routeProvider) {
  $routeProvider
    .when('/search', {
      controller: 'SearchController',
      templateUrl: 'modules/SearchPage.html'
    })
    .when('/customers', {
      controller: 'CustomersController',
      templateUrl: 'modules/CustomersPage.html'
    })
    .when('/latest', {
      controller: 'LatestController',
      templateUrl: 'modules/LatestPage.html'
    })
    .otherwise({
      controller: function(HeaderService) {
        HeaderService.openPage('latest');
      },
      template: ''
    });
});
