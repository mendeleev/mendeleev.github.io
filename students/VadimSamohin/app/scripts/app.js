/**
 * Created by student on 27.03.16.
 */

(function() {

    require.config({
        paths: {
            jquery: "../lib/jquery/dist/jquery.min"
        },
        "shim": {
            "../lib/jquery/dist/jquery.min": {
                "exports": "$"
            }
        }
    });

    define(['work_modules/main']);
})();
