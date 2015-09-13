



angular.module('pizzaBuilder')
	
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

	    console.log(this.selection);
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



