


angular.module('pizzaBuilder')

	/**
	 * component list contorller(selecting etc);
	 */
	.controller('ComponentListController', ['Components', function(Components) {
	
		this.toggleSelection = Components.toggleSelection;
		this.howMany = Components.howMany;
		this.selection = Components.getSelection();

	}]);


