(function () {
	


	angular.module('pizzaBuilder')

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

		}]);



})(); 