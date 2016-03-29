define(['jquery'], function () {
        var clicksStorage = {
            addClick: function (minionID) {
                // Check browser support
                if (typeof(Storage) !== 'undefined') {
                    // Get clicks in JSON
                    var clicks = this.getClicks();

                    if (typeof clicks[minionID] !== 'undefined') {
                        clicks[minionID]++;
                    } else {
                        clicks[minionID] = 1;
                    }

                    // Put clicks back to Local Storage in JSON
                    localStorage.setItem('clicks', JSON.stringify(clicks));
                    return 1;
                } else {
                    // Local Storage not supported
                    return -1;
                }
            },
            getClicks: function () {
                // Check browser support
                if (typeof(Storage) !== 'undefined') {
                    // get all clicks in object
                    var result = JSON.parse(localStorage.getItem('clicks'));
                    if (result === null) result = {};
                    return result;
                } else {
                    // Local Storage not supported
                    return -1;
                }

            },
            clearStorage: function () {
                // Check browser support
                if (typeof(Storage) !== 'undefined') {
                    localStorage.removeItem('clicks');
                    return 1;
                } else {
                    // Local Storage not supported
                    return -1;
                }
            }
        };

        return clicksStorage;
    }
);