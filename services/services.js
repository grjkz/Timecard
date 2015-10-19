var AppServices = angular.module('appServices',[]);

AppServices.factory('TimeCards',[$resource, function($resource) {
	return $resource('/timecards', {}, {
		query: {method: GET, isArray:true}
	})
}])