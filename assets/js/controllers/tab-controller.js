(function () {


	angular.module('pizzaBuilder')

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


		}]);



})(); 