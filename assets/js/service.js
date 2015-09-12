(function() {
	

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


		}])



		
		.service('Components', [function() {
			
			// array of selected components(ids)
			this.selection = [];


			/**
			 * Add or remove given id from array
			 * @param  {String} id id of component
			 */
			this.toggleSelection = function(id) {
				var index = this.selection.indexOf(id);

		    if (index > -1) {
		      this.selection.splice(index, 1);
		    } else {
		      this.selection.push(id);
		    }
			};

			/**
			 * Set array of selected components to given array
			 * @param {Array=} arr array of components id
			 */
			this.setSelection = function(arr) {
				this.selection = arr || [];
			}


			/**
			 * Returns array of selected ids
			 * @return {Array} array of selected ids
			 */
			this.getSelection = function() {
				return this.selection;
			};


			/**
			 * Returns number of selected components in given category(by number)
			 * @param  {Number} index category index
			 * @return {Number}       number of selected ids in given category
			 */
			this.howMany = function(index) {
				var
					rx = new RegExp(index + '_\\d'),
					quantity = 0;

				this.selection.forEach(function(value, index) {
					if (rx.test(value))
						quantity += 1;
				});


				return quantity;
			};


		}]);




}());