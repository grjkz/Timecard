console.log('controllers.js linked')
var AppControllers = angular.module('appControllers',[]);

AppControllers.controller('timecardsController', ['$scope', 'Timecard' ,function($scope, Timecard) {
	$scope.timecards = Timecard.query();
	// Timecard.get({id:1}, function(data) {debugger})

	$scope.category = 'timein';
	$scope.reverse = true;
	$scope.changeOrder = function(cat) {
		$scope.reverse = ($scope.category == cat) ? !$scope.reverse : $scope.reverse
		$scope.category = cat
	}
}])

AppControllers.controller('employeesController', ['$scope', 'Employee' ,function($scope, Employee) {
		$scope.employees = Employee.query()

		$scope.category = 'id'
		$scope.reverse = false
		$scope.changeOrder = function(cat) {
			$scope.reverse = ($scope.category == cat) ? !$scope.reverse : $scope.reverse
			$scope.category = cat
		}

		$scope.create = function(lname, fname, eID) {
			// console.log("Last: " +lname+ " | First: " +fname+ " | eID: " +eID)
			var employee = new Employee;
			employee.firstName = fname 
			employee.lastName = lname
			employee.eid = eID
			// console.log(employee)
			Employee.save(employee, function(response) {
				$scope.employees.push(response)
				// console.log(response.fname + " " + response.lname + " Added")
			}, function(error) {
				console.log(error);
			})
		}
		$scope.delete = function(employee, index) {
			// console.log("ID: "+employee.employee_id)
			var confirmed = confirm("Are you sure you want to delete "+ angular.uppercase(employee.lname)+", "+angular.uppercase(employee.fname) + "?\n"
				+"This will also delete all associated TIME CARDS!")
			if (confirmed) {
				Employee.delete({id:employee.employee_id}, 
					function(result) { // success
						if (result.deleted) {
							console.log("deleted "+employee.fname+" "+employee.lname)
							$scope.employees.splice(index,1)
						}
					}, function(error) { console.log("error deleting") }) // failure
			}
		}
}])

// used for punching in/out. POST/PUT /api/timecards
AppControllers.controller('usersController', ['$scope', '$location', 'Timecard', function($scope, $location, Timecard) {
	// $scope.employees = Employee.query()
	$scope.punchIn = function(eID) {
		// if (/^[0-9]{4}$/.test(eID)) {
			// console.log('PunchIn: '+eID)
			var timecard = new Timecard;
			timecard.eid = eID
			Timecard.save(timecard, function(response) {
				// checks if INSERT INTO succeeded
				if (response.insertId >= 0) {
					$location.path('/timecards')
				} else {
					$('.error-msg').text("ID Doesn't Exist")
				}
			})
		// }
		// else {
		// 	$('.error-msg').text("Must be 4 digits")
		// }
	}
	$scope.punchOut = function(eID) {
		// if (/^[0-9]{4}$/.test(eID)) {
		// 	console.log('PunchOut: '+$scope.eID)
			var timecard = new Timecard;
			timecard.eid = eID
			Timecard.update(timecard, function(response) {
				console.log(response)
				debugger
			})
		// }
		// else {
		// 	$('.error-msg').text("Must be 4 digits")
		// }
	}
}])

AppControllers.controller('EmployeeTimecardsController', ['$scope','EmployeeTimecard',function($scope,EmployeeTimecard) {
	$scope.timecards = EmployeeTimecard.get({e_id:1})
}])

AppControllers.controller('testController',['$scope','Test',function($scope,Test) {
	$scope.test = Test.query();
	$scope.single = Test.show({id:1})
}])