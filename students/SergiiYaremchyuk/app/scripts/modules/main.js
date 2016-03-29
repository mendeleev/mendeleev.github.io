define(
    "modules/main",
    [
        "modules/partials/gallery",
        "modules/partials/minion",
        "jquery"
    ],
    function(gallery, minion, $) {

        var $gallery = $('ul.gallery');

        $.getJSON( "minions.json")
            .done(function( minions ) {
                gallery.appendMinions(minions);
            })
            .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });


        $gallery.on('click', 'li.item', function (e) {
            minion.addClick($(this));
        });
    }
);