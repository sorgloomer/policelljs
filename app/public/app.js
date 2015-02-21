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
      templateUrl: 'modules/Search/SearchPage.html'
    })
    .when('/customers', {
      controller: 'CustomersController',
      templateUrl: 'modules/Customers/CustomersPage.html'
    })
    .when('/customers/new', {
      controller: 'NewCustomerController',
      templateUrl: 'modules/Customers/NewCustomerPage.html'
    })
    .when('/customers/edit/:id', {
      controller: 'EditCustomerController',
      templateUrl: 'modules/Customers/EditCustomerPage.html'
    })
    .when('/latest', {
      controller: 'LatestController',
      templateUrl: 'modules/Latest/LatestPage.html'
    })
    .otherwise({
      controller: 'RouterController',
      template: ''
    });
});
