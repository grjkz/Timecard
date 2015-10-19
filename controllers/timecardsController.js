console.log('timecardsController.js linked')
App.controller('timecardsController',function($scope, $http) {
	$http.get('/timecards').success(function(data) {
		$scope.timecards = data
	})

	$scope.fullname = function(data) {
		return data.lname+', '+data.fname;
	}
	$scope.category = 'timein';
	$scope.reverse = true;
	$scope.changeOrder = function(cat) {
		$scope.reverse = ($scope.category == cat) ? !$scope.reverse : $scope.reverse
		$scope.category = cat
	}
})