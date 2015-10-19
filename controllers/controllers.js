console.log('controllers.js linked')
var AppControllers = angular.module('appControllers',[]);

AppControllers.controller('timecardsController',function($scope, $http) {
	$http.get('/timecards').success(function(data) {
		$scope.timecards = data;
		// ng-repeat passed this function 1 item in collection
		// $scope.fullname = function(e) {
		// 	return e.lname+", "+e.fname
		// }
	})
	$scope.category = 'timein';
	$scope.reverse = true;
	$scope.changeOrder = function(cat) {
		$scope.reverse = ($scope.category == cat) ? !$scope.reverse : $scope.reverse
		$scope.category = cat
	}
})

AppControllers.controller('employeesController',function($scope, $http) {
	$http.get('/employees').success(function(data) {
		$scope.employees = data
	})
})