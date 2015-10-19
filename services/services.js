console.log('services.js linked')
var AppServices = angular.module('appServices',['ngResource']);

AppServices.factory('TimeCard', ['$resource', function($resource) {
	return $resource('/timecards', {}, {
		query: {method: "GET", isArray:true}
	})
}])