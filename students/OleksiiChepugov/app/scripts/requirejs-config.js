'use strict';

(function() {
	require.config({
		paths: {
			jquery: "../lib/jquery/dist/jquery.min"
		}
	});
	define(["modules/main"]);
})();