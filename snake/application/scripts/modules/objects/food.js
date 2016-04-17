(function() {
  define("modules/objects/food", [], function() {
    var elements = [],
      _ID = 2;

    return {
      tileSize: 0,

      init: function(cols, rows, tileSize, num) {
        elements = [];
        this.tileSize = tileSize;
        this.generateFood(cols, rows, num);
      },

      getId: function() {
        return _ID;
      },

      printItem: function(ctx, coords) {
        var img = new Image();
        img.src = 'images/apple.png';

        ctx.drawImage(img,coords.x*this.tileSize, coords.y*this.tileSize, this.tileSize, this.tileSize);
      },

      generateFood: function(cols, rows, num) {
        for(var i = 0; i < num; i++) {
          elements.push(this.getFood(cols, rows));
        }
      },

      getFood: function(cols, rows) {
        return {
          x: Math.floor(Math.random()*cols-1)+1,
          y: Math.floor(Math.random()*rows-1)+1,
          id: _ID
        }
      },

      getElements: function() {
        return elements;
      }
    }
  });
})();
