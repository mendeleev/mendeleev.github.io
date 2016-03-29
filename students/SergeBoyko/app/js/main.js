require.config({
    paths: {
        jquery: "../lib/jquery/dist/jquery"
    }
});

require(['jquery', 'clicks'], function ($, clicks) {

    if (initClicks()) {
        // click handler
        $('.gallery .item').click(function () {
            var minionID = $(this).index();
            // Get minion ID and update Local Storage
            clicks.addClick(minionID);
        });

        // reset handler
        $('.reset').click(function (e) {
            e.preventDefault();
            clicks.clearStorage();
            $('.gallery li span').css('opacity', 0);
            $('.gallery li .counter').text('0');
            $('.gallery li span').animate({opacity: 1}, 1000);
        });
    } else {
        alert("Sorry, but Local Storage isn't supported by your browser.\nClicks won't be saved!");
    }

    function initClicks() {
        var clicksStorage = clicks.getClicks();
        $('.gallery li').each(function (index, value) {
            if (typeof clicksStorage[index] !== 'undefined') {
                $(this).find('.counter').text(clicksStorage[index]);
            }
        });
        $('.gallery li span').animate({opacity: 1}, 500);

        // -1 means no Local Storage support
        return clicksStorage !== -1;
    }
});