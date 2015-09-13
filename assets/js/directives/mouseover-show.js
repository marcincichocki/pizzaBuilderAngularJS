



angular.module('pizzaBuilder')

	// show/hide parent of element on mouseover/mouseleave
	.directive('mouseoverShow', function() {
		return function(scope, element, attrs) {

			element.parent().on('mouseenter', function() {
				element.removeClass('hide');
			});

			element.parent().on('mouseleave', function() {
				element.addClass('hide');
			});

		};

	});



