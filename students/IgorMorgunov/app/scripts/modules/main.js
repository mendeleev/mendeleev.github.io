define(['jquery'], function () {


    function imgJSON() {
        return $.ajax({
            url: "image_json/img.json",
            dataType: "json"
        });
    }

    var $content = $('.gallery');

    imgJSON().done(function (temp) {

        temp.forEach(function (valera) {
            var $image = $('<img />').attr('src', 'images/' + valera.img);
            var $section = $('<span></span>').addClass('counter').attr("id", valera.id).html(localStorage[valera.id]?localStorage[valera.id]:valera.counter);
            var $li = $('<li></li>').addClass('item').append($image).append($section).appendTo($content);

            $li.click({valera: $section, id: valera.id}, function (event) {
                var count = Number(event.data.valera.html()) + 1;
                event.data.valera.html(count);

            });

        });

    }).fail(function (error) {
        console.log(error.statusText);
    });
});