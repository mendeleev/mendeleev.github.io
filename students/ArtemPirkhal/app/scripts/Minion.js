function Minion(_data) {

    var id;
    var title;
    var image;
    var rating;
    if (_data) {
        if (_data.hasOwnProperty('id')) {
            id = _data.id;
        }
        if (_data.hasOwnProperty('title')) {
            title = _data.title;
        }
        if (_data.hasOwnProperty('image')) {
            image = _data.image;
        }
        if (_data.hasOwnProperty('rating')) {
            rating = _data.rating;
        }
    }

    this.id = function (_value) {
        if (_value !== undefined) {
            id = _value;
        }
        return id;
    };

    this.image = function (_value) {
        if (_value !== undefined) {
            image = _value;
        }
        return image;
    };

    this.rating = function (_value) {
        if (_value !== undefined) {
            rating = _value;
        }
        return rating;
    };

    this.createView = function () {
        var $image = $('<img />').attr('src', image);
        var $span = $('<span />').addClass('counter').append(rating);
        var clickHandler = function () {
            rating++;
            $span.empty().append(rating);
            var storageID = 'minion_' + id;
            localStorage.setItem(storageID, rating);
        };
        var $item = $('<li />')
                .addClass('item')
                .append($image)
                .append($span)
                .on('click', clickHandler);
        return $item;
    };

}