'use strict';

define([], function () {
	var MinionsData = {
		BaseName: "MinionsData",
		saveData: function(data) {
			localStorage.setItem(this.BaseName, JSON.stringify(data));
		},
		loadData: function() {
			return JSON.parse(localStorage.getItem(this.BaseName))
		}
	};
	return MinionsData;
});