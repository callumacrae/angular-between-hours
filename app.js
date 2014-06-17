'use strict';

/* global angular */

var app = angular.module('playground', []);

app.directive('showBetweenHours', function () {
	return {
		restrict: 'AC',
		link: function (scope, element, attrs) {
			if (!attrs.showBetweenHours) {
				return;
			}

			var hours = attrs.showBetweenHours.split(/[^\d:]/);

			if (hours.length !== 2) {
				return;
			}

			var showAt = getTimeString(hours[0]),
				hideAt = getTimeString(hours[1]),
				d = new Date(),
				now = w(d.getHours()) + w(d.getMinutes()) + w(d.getSeconds());

			if (
				(showAt < hideAt || now < showAt || now >= hideAt) &&
				(showAt <= hideAt || (now >= hideAt && now < showAt))
				) {
				element.data('olddisplay', element.css('display'));
				element.css('display', 'none');
			}


			function getTimeString(time) {
				time = time.split(':');

				return w(time[0]) + w(time[1] || 0) + w(time[2] || 0);
			}

			// Ensure the number is two digits long
			function w(n) {
				n = Number(n);
				return n < 10 ? '0' + n : n.toString();
			}
		}
	};
});