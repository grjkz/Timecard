console.log('employeesController.js linked');
App.controller('employeesController',function($scope, $http) {
	$http.get('/employees').success(function(data) {
		$scope.employees = data
	})
})