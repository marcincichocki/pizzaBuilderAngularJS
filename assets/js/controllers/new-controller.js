(function () {
	


	angular.module('pizzaBuilder')

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