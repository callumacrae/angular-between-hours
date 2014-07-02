# angular-between-hours

An AngularJS directive which will only display an element during certain hours.

## Using

To use, load between-hours.js into your project, and add
"callumacrae.betweenHours" as a dependency. Then, a factory named
`isBetweenHours` and a directive called `showBetweenHours` are added. They can
be used as follows:

	angular.module('app' ['callumacrae.betweenHours'])
		.controller('myController', function (isBetweenHours) {
			isBetweenHours('10:00', '21:00'); // Test current time
			
			isBetweenHours('10:00', '21:00', '12:32'); // Test time
		});

The first two arguments are the start and end time, and the third optional
argument is the time to test (if not specified, it'll default to the current
time). If you specify a start time of 23:00 and a finish time of 1:00, testing
23:30 will return true.

There's also a directive, `showBetweenHours`:

	<div show-between-hours="9:00–17:00">
    	It's currently between office hours
	</div>
	<div show-between-hours="17:00–9:00">
		It's currently out of office hours
	</div>

## Installing

You can install through npm:

	npm install --save angular-between-hours

Or through bower:

	bower install --save angular-between-hours

Or, of course, manually.

## Testing

WIP. Sorry!
