define(['jquery'], function($){
    $.getJSON("./data/data.json", function(data){
        $.each( data, function(i, elem) {
            var localStor = localStorage;
            var oneStorageValue = localStor.getItem(elem.id);
            var currentCount;
            if (oneStorageValue == null) {
                currentCount = 0;
            } else {
                currentCount = oneStorageValue
            }

            $liElem = $('<li/>', {id: elem.id, class: "item"});
            $imgElem = $('<img/>', {src: "./images/" + elem.image});
            $spanElem = $('<span/>', {class: "counter", text: Number(currentCount)});
            $liElem.append($imgElem, $spanElem);
            $('.gallery').append($liElem);

        });
    })
        .fail(function(){
            console.error("Data Error")
        })
});
