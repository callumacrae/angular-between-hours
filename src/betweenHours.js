/* global angular */

angular.module('callumacrae.betweenHours', [])
	.factory('isBetweenHours', function () {
		'use strict';

		return function (startTime, endTime, timeToTest) {
			startTime = getTimeString(startTime);
			endTime = getTimeString(endTime);

			if (timeToTest) {
				timeToTest = getTimeString(timeToTest);
			} else {
				var d = new Date();
				timeToTest = w(d.getHours()) + w(d.getMinutes()) + w(d.getSeconds());
			}

			if (startTime < endTime) { // 9 - 17
				if (startTime > timeToTest || endTime <= timeToTest) {
					return false;
				}
			} else { // 17 - 9
				if (startTime > timeToTest && endTime <= timeToTest) {
					return false;
				}
			}

			return true;
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
	})
	.directive('showBetweenHours', function (isBetweenHours) {
		'use strict';

		return {
			restrict: 'AC',
			link: function (scope, element, attrs) {
				// Turns '9:10-20:15' into ['9:10', '20:15']
				var hours = attrs.showBetweenHours.split(/[^\d:]/);

				if (hours.length !== 2) {
					return;
				}

				if (!isBetweenHours(hours[0], hours[1])) {
					element.data('olddisplay', element.css('display'));
					element.css('display', 'none');
				}
			}
		};
	});