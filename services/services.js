console.log('services.js linked')
var AppServices = angular.module('appServices',['ngResource']);

AppServices.factory('Timecard', ['$resource', function($resource) {
	return $resource('/api/timecards/:id');
}])

AppServices.factory("Employee", ['$resource', function($resource) {
	return $resource('/api/employees/:id');
}])

AppServices.factory("EmployeeTimecard", ['$resource', function($resource) {
	return $resource('/api/employees/:e_id/timecards/:c_id',{},{
		'get': { method: 'GET', isArray: true }
	})
}])

AppServices.factory("Test", ['$resource', function($resource) {
	return $resource('/api/test/:id', {}, {
		'create':  { method: 'POST' },
    'index':   { method: 'GET', isArray: true },
    'show':    { method: 'GET', isArray: false },
    'update':  { method: 'PUT' },
    'destroy': { method: 'DELETE' }
	})
}])

// DEFAULT METHODS
// get()
// query()
// save()
// remove()
// delete()