console.log('timecard.js linked')
App.model('timecard',function($scope) {
	db.query('select *, group_concat(timein) AS timein from employees as e join timecards as t on e.employee_id = t.employee_id group by eID;', function(err, rows, fields) {
			$scope.employee = {
				fname: rows.fname,
				lname: rows.lname,
				fullname: rows.lname+" "+lname
			};
	})
})