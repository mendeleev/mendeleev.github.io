'use strict';

define(["jquery", "modules/increase", "modules/MinionsData"],
	function ($, increase, MinionsData) {
		function populate(data) {
			var items = [];
			data.forEach(function (val, key, arr) {

				var image = $('<img>', { // Создаем изображение
					"src": 'images/' + val.image,
					"title": val.title
				});

				var counter = $('<span>', { // Создаем счетчик
					"class": "counter",
					text: val.count
				});

				var listItem = $('<li>', { // Создаем миньёна
					"class": "item",
					on: {
						click: function (event) {
							increase(this.querySelector('span'));
							arr[key].count++;
							MinionsData.saveData(data); // Созраняем данные в localStorage
						}
					}
				}).append(image, counter);
				items.push(listItem);
			});

			$(".gallery").prepend(items); // Добавляем разом всех миньенов
		}

		return populate;
	});