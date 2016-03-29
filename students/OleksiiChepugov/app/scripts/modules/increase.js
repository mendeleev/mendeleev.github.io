'use strict';
define(['jquery'],
	function ($) {
		function increase(element) {
			//element.innerText = Number(element.innerText) + 1; // Не всегда срабатывает в firefox)
			var $element = $(element); // Запоминаем объект для ускорения
			$element.text(Number($element.text()) + 1); // Для кроссбраузерности (не работало в firefox)
		};
		return increase;
	});