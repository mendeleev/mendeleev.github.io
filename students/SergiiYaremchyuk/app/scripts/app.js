(function() {

    require.config({
        urlArgs: "v=0.01",
        paths: {
            jquery: "../lib/jquery/dist/jquery.min"
        },

        "shim": {
            "../lib/jquery/dist/jquery.min": {
                "exports": "$"
            }
        }
    });


    define(["modules/main"]);


})();