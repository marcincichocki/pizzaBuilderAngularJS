


angular.module('pizzaBuilder')

	.service('Data', ['$http', function($http) {
	
		// express server port
		this.PORT = 1337;


		/**
		 * Simple wrapper for $http get method
		 * @param  {String} url url
		 * @return {Object}     promise
		 */
		this.get = function(url) {
			return $http({
				method: 'GET',
				url: url,
				cache: true
			});
		};

		/**
		 * Simple wrapper for $http post method
		 * @param  {String} url  url
		 * @param  {*}      data data you pass
		 * @return {Object}      promise
		 */
		this.post = function(url, data) {
			return $http({
				method: 'POST',
				url: url,
				data: data
			});
		};


	}]);



