(function () {
	

	// main module
	angular.module('pizzaBuilder')



		/**
		 * AppCtrl: main controller of app, holds json data, and if request fail,
		 * serve data on his own
		 */
		.controller('AppCtrl', ['$scope', 'Data', 'Components', function($scope, Data, Components) {

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



		}])


		/**
		 * component list contorller(selecting etc);
		 */
		.controller('ComponentListController', ['Components', function(Components) {
		
			this.toggleSelection = Components.toggleSelection;
			this.howMany = Components.howMany;
			this.selection = Components.getSelection();

		}])




		/**
		 * tab controller(switching)
		 */
		.controller('TabController', [function() {


			// active tab
			this.current = 0;

			/**
			 * Check if given tab is selected
			 * @param  {Number}  tab ngRepeat $index of <li>
			 * @return {Boolean}     if tab is selected return true, otherwise false
			 */
			this.isSelected = function(tab) {
				return this.current === tab;
			};

			/**
			 * Select tab
			 * @param  {Number} tab $index of tab
			 */
			this.selectTab = function(tab) {
				this.current = tab;
			};


		}])



		/**
		 * main contorler of /results route
		 */
		.controller('ResultsController', ['$scope', '$routeParams', function($scope, $routeParams) {

			// selected pizza index
			$scope.index = $routeParams.id;

			// default orderBy value
			$scope.orderByField = 'price';

			// default order of sort
			$scope.reverse = false;

			// default place
			$scope.placeIndex = $scope.places.list[0];



			/**
			 * Change default sort option and direction
			 * @param {(String|Function)} field column property name, or function
			 * used to fill the column
			 */
			$scope.setOrderByFiled = function(field) {
				$scope.orderByField = field;
				$scope.reverse = !$scope.reverse;
			};



			/**
			 * returns percentage similarity of user selected pizza and given pizza
			 * @param  {Object} pizza standard pizza object
			 * @return {Number}       percentage similarity
			 */
			$scope.getPercentages = function(pizza) {
				var
						contain = 0,
						user_components = $scope.pizzaList[$scope.index].components,
						maximum = user_components.length,
						pizza_components = pizza.components,
						j = pizza_components.length;

					while (j--) {
						if (user_components.indexOf(pizza_components[j]) > -1) {
							contain += 1;
						} else {
							maximum += 1;
						}
					}

					return parseFloat((contain / maximum * 100).toFixed(2));
			};


			/**
			 * Returns length of pizza.components
			 * @param  {Object} pizza standard pizza object
			 * @return {Number}       length of given pizza.comopnents array
			 */
			$scope.getComponentsLength = function(pizza) {
				return pizza.components.length;				
			};


			/**
			 * Returns class name due to percentage similarity
			 * @param  {Object} pizza standart pizza object
			 * @return {String}       name of class
			 */
			$scope.getClass = function(pizza) {
				
				var className = '';

				for (var i = 110; i -= 10; ) {
					if ($scope.getPercentages(pizza) >= i) {
						className = 'percent' + i;

						return className;
					}
				}

				return;

			};

		}])



		/**
		 * main contorller of /edit route
		 */
		.controller('EditController', ['$scope', '$location', '$routeParams', 'Data', 'Components', function($scope, $location, $routeParams, Data, Components) {

			// some data to fill inputs in view
			$scope.pizza = {
				index: $routeParams.id,
				name: $scope.pizzaList[$routeParams.id].name
			};

			$scope.title = 'Edytuj' ;



			/**
			 * Edit pizzaList at given index
			 * @param  {String} name  pizza name
			 * @param  {Number} index index of pizza to be changed
			 */
			$scope.save = function(name, index) {
				var pizza = {
					name: name, 
					components: Components.getSelection()
				};

				if ($scope.$parent.useExpress) {
					Data
						.post('http://localhost:' + Data.PORT + '/edit', {
							index: index,
							data: pizza
						}).then(function(response) {
							$location.path('/');
							$scope.$parent.pizzaList[index] = pizza;
						});
				} else {
					$scope.$parent.pizzaList[index] = pizza;
					$location.path('/');
				}

			};

		}])

		

		/**
		 * main contorller of /new route
		 */
		.controller('NewController', ['$scope', '$location', 'Components', 'Data', function($scope, $location, Components, Data) {
			

			// some data to fill inputs in view
			$scope.title = 'Dodaj';

			/**
			 * Add new pizza to pizzaList
			 * 
			 * @param {String} name name of pizza
			 */
			$scope.save = function(name) {
				var pizza = {
					name: name,
					components: Components.getSelection()
				};

				if ($scope.$parent.useExpress) {
					Data
						.post('http://localhost:' + Data.PORT + '/list', pizza)
						.then(function(response) {
							$location.path('/');
							$scope.$parent.pizzaList.push(pizza);
						});
				} else {
					$scope.$parent.pizzaList.push(pizza);
					$location.path('/');
				}
			};

		}]);

}());