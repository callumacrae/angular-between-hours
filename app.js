'use strict';

/* global angular */

var app = angular.module('playground', []);

app.directive('showBetweenHours', function () {
	return {
		restrict: 'AC',
		link: function (scope, element, attrs) {
			// Turns '9:10-20:15' into ['9:10', '20:15']
			var hours = attrs.showBetweenHours.split(/[^\d:]/);

			if (hours.length !== 2) {
				return;
			}

			var showAt = getTimeString(hours[0]),
				hideAt = getTimeString(hours[1]),
				d = new Date(),
				now = w(d.getHours()) + w(d.getMinutes()) + w(d.getSeconds());

			if (showAt < hideAt) { // 9 - 17
				if (showAt > now || hideAt <= now) {
					hideElement(element);
				}
			} else { // 17 - 9
				if (hideAt <= now && now < showAt) {
					hideElement(element);
				}
			}
		}
	};


	/**
	 * Turn 6:30 into 063000 for comparison.
	 *
	 * @param {string} time String containing the time.
	 * @returns {string} Comparable string.
	 */
	function getTimeString(time) {
		var parts = time.split(':');
		return w(parts[0]) + w(parts[1] || 0) + w(parts[2] || 0);
	}

	/**
	 * Convert a number to a string of length two, by adding a 0 if necessary.
	 *
	 * @param {string|number} n Number to convert to string.
	 * @returns {string} String of length two.
	 */
	function w(n) {
		n = Number(n);
		return n < 10 ? '0' + n : n.toString();
	}

	/**
	 * Hide an element, storing the old display type in a data attribute.
	 * 
	 * @param element jqLite object containing element(s) to hide.
	 */
	function hideElement(element) {
		element.data('olddisplay', element.css('display'));
		element.css('display', 'none');
	}
});