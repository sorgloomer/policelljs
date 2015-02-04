angular.module('policellApp', [
	'ngRoute',
  'ngGrid',
  'ui.calendar',
  'ui.select'
])
.config(function($routeProvider, $provide) {
  
	$routeProvider
  .otherwise({
    controller: 'WelcomeController',
    templateUrl: 'pages/welcome/WelcomePage.html'
  });
    
    /*
  $provide.decorator('i18nService', function($delegate) {
    // $delegate.setCurrentLang('hu');
    return $delegate;
  });
  */
});
