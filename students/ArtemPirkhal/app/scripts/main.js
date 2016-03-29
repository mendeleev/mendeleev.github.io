require(['lib/jquery/dist/jquery', 'scripts/Minion', 'scripts/MinionsCollector'], function () {
    $.ajax({
        url: 'data/data.json',
        dataType: 'json',
        success: init
    });
});

function init(minionsData, textStatus, jqXHR) {
    if (minionsData) {
        var mv = new MinionsCollector(minionsData);
        $('#content').append(mv.createView());
    }
}


