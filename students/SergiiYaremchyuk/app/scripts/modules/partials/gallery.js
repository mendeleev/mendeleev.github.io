define("modules/partials/gallery", ["modules/partials/minion"], function(minion) {

    return {
        "appendMinions": function (minions) {
            for (var i = 0; i < minions.length; i++) {
                var $html_minion = minion.getMinionHTML(minions[i]);
                $('ul.gallery').append($html_minion);
            }
        }
    }
});