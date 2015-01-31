angular.module('policellApp', [
	'ngRoute'
])
.config(function($routeProvider) {
	$routeProvider
		.otherwise({
			controller: 'WelcomeController',
			templateUrl: 'WelcomePage.html'
		});
})
.controller('WelcomeController', function($scope) {
	$scope.list = [1,2,3,5,7,9];
});