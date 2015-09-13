



angular.module('pizzaBuilder')

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

	}]);


