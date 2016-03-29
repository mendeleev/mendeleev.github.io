(function() {

    require.config({
        baseUrl: 'js',
        paths: {
            main: "modules/main",
            sorting: "modules/sorting",
            dataloading : "modules/dataloadng",
            searching: "modules/searching",
            counterclear: "modules/counterclear",
            jquery: "lib/jquery/dist/jquery.min"
        },

        "shim": {
            "lib/jquery/dist/jquery.min": {
                "exports": "$"
            }
        }
    });

    //define(['jquery'], function(){
        define(['jquery', "main"]);
    //});

})();