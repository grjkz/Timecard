console.log('mainApp.js linked')
var App = angular.module('App',["ngRoute","appControllers", "appServices"]);
App.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/views/main.html',
		controller: ''
	})
	.when('/timecards', {
		templateUrl: '/views/timecards.html',
		controller: 'timecardsController'
	})

	.otherwise({
		redirectTo: '/'
	})
}])