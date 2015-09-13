(function () {
	

	angular.module('pizzaBuilder')
	/**
		 * AppController: main controller of app, holds json data, and if request fail,
		 * serve data on his own
		 */
		.controller('AppController', ['$scope', 'Data', 'Components', function($scope, Data, Components) {

			/**
			 * App will use this set of data ONLY if express server is down.
			 * Please note that data will come back to initial state with 
			 * every page refresh, so please set up your express server ( ͡° ͜ʖ ͡°)
			 */
			var backup = [
				{ name: 'Capriciosa', components: ['2_4', '1_7', '3_1'] },
				{ name: 'Pepperoni', components: ['2_2', '2_3'] }
			];

			/**
			 * list of $scope variables: 
			 * 
			 * 	pizzaList
			 * 	useExpress
			 * 	items
			 * 	places
			 */
			
			// store array of pizza objects
			$scope.pizzaList = null;
			$scope.useExpress = null;

			/* get json from service and saves it to $scope */

			// info about components
			Data
				.get('../data/items.json')
				.then(function(response) {
					$scope.items = response.data;
				}, function(response) {
					console.log(response.statusText)
				});

			// info about places
			Data
				.get('../data/places.json')
				.then(function(response) {
					$scope.places = response.data;
				}, function(response) {
					console.log(response.statusText)
				});


			// info about pizzas(from express server)
			Data
				.get('http://localhost:' + Data.PORT + '/list')
				.then(function(response) {
					$scope.pizzaList = response.data;
					$scope.useExpress = true;
				}, function(response) {
					// if express server is down use data stored in controller
					$scope.pizzaList = backup;
					console.log('Error! Status: ' + response.status + '. Using data stored in controller.');
				});


			/**
			 * Delete pizza at given index
			 * @param  {number} index index of a $scope.pizzaList array
			 */
			this.delete = function(index) {

				if ($scope.useExpress) {
					Data
						.post('http://localhost:' + Data.PORT + '/delete', { index: index })
						.then(function(response) {
							$scope.pizzaList.splice(index, 1);
						});
				} else {
					$scope.pizzaList.splice(index, 1);
				}

			};


			/**
			 * set selected components from given array(data stored in service)
			 * @param {Array} arr array of components, example: ['1_1', '2_1']
			 */
			this.setSelection = function(arr) {
				Components.setSelection(arr);
			};


			/**
			 * Control which components will be visible within .components 
			 * for gven pizza index
			 * 
			 * @param {Number} index index of a $scope.pizzaList array
			 */
			this.showPizza = function(index) {
				this.showIndex = index;
			};



		}]);



})(); 