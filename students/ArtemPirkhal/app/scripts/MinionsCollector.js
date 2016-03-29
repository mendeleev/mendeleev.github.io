
function MinionsCollector(_data) {

    var minions;
    if (_data) {
        minions = [];
        _data.forEach(function (_minion) {
            var minion = new Minion(_minion);
            var storageID = 'minion_' + minion.id();
            if (localStorage.hasOwnProperty(storageID)) {
                minion.rating(localStorage[storageID]);
            }
            minions.push(minion);
        });
    }

    this.createView = function () {
        var $gallery = $('<ul />').addClass('gallery');
        minions.forEach(function (_minion) {
            $gallery.append(_minion.createView());
        });
        return $gallery;
    };
}