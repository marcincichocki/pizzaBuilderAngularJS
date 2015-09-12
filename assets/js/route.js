(function () {
	
	angular.module('pizzaBuilder')


		/**
		 * routes configuration
		 */
		.config(function($routeProvider, $locationProvider) {


			$routeProvider

				// /
				.when('/', { templateUrl: '../partials/root.html' })

				// /new
				.when('/new', { templateUrl: '../partials/edit.html', controller: 'NewController' })

				// /edit
				.when('/edit/:id', { templateUrl: '../partials/edit.html', controller: 'EditController' })

				// /results
				.when('/results/:id', { templateUrl: '../partials/results.html', controller: 'ResultsController' })


				// any other route
				.otherwise({
	      	redirectTo: '/'
	    	});



			// remove #/
			$locationProvider.html5Mode(true);


		});


}());