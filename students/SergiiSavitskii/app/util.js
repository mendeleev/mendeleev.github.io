var dataAPI = "data/minions.json";
$.getJSON(dataAPI)
    .done(function (data) {
        for (var key in data) {
            if (localStorage.getItem(data[key].id)) {
                var $span = $('<span>').addClass("counter").text(localStorage.getItem(data[key].id))
            } else {
                var $span = $('<span>').addClass("counter").text('0')
            }
            var $image = $('<img>').attr('src', data[key].image);
            var $li = $('<li>').addClass("item");
            $li.attr('onclick', "increase(this.querySelector('span')," + data[key].id + ")")
            $li.append($image).append($span);
            $("ul").append($li);
        }
    })
    .fail(function () {
        console.log("error");
    })