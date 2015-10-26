console.log('mainApp.js linked')
var App = angular.module('App',["ngRoute","appControllers", "appServices"]);

App.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/views/main.html',
		controller: 'usersController'
	})
	.when('/timecards', {
		templateUrl: '/views/timecards.html',
		controller: 'timecardsController'
	})

	.when('/employees', {
		templateUrl: 'views/employees.html',
		controller: 'employeesController'
	})
	.when('/employees/:id/timecards', {
		templateUrl: 'views/employeetimecards.html',
		controller: 'EmployeeTimecardsController'
	})
	.when('/test', {
		templateUrl: 'views/test.html',
		controller: 'testController'
	})
	.otherwise({
		redirectTo: '/timecards'
	})
}])