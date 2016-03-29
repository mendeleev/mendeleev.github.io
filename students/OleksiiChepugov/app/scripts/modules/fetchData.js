'use strict';

define(
	["jquery", "modules/populate", "modules/MinionsData"],
	function ($, populate, MinionsData) {
		try {
			var data = MinionsData.loadData(); // Получаем дынные из localStorage
			if (data) {
				populate(data); // Если есть подходящие данные, населяем страницу миньёнами
			} else {
				throw new Error;
			}
		}
		catch (e) { // Если нет подходящих данных, пытаемся их скачать
			console.log("No saved or valid internal data - trying to fetch external data");
			$.getJSON("settings.json")
				.done(function (data) {
					MinionsData.saveData(data); // Если скачанны подходящие данные, населяем страницу миньёнами
					populate(data);
				})
				.fail(function () { // При ошибке скачивания выводим сообщение
					var listItem = $('<p>', {
						"class": "error",
						text: "Error during external data preparation"
					}).prependTo("body");
				})
				.always(function () {
					console.log("External data loading complete");
				});
		}
	});