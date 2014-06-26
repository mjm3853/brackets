//create the Brackets App module
var bracketsApp = angular.module('bracketsApp', [
	'ngRoute',
	'bracketsControllers'
]);

//configure the Angular routes.
//there is a Draw page with a controller and a List page with a separate controller
bracketsApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/draw', {
				templateUrl: '/templates/draw.html',
				controller: 'drawControl'
			}).
			when('/list', {
				templateUrl: '/templates/list.html',
				controller: 'listControl'
			}).
			otherwise({
				redirectTo: '/draw'
			});
	}]);
