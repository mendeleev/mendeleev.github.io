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

      getImage: function() {
        var images = [
              {
                img: new Image(),
                path: 'images/apple.png',
                pts: 1
              },
              {
                img: new Image(),
                path: 'images/strawberry.png',
                pts: 2
              },
              {
                img: new Image(),
                path: 'images/mushroom.png',
                pts: -1
              }
            ],
            obj = images[Math.floor(Math.random()*images.length)];
        obj.img.src = obj.path;
        return obj;
      },

      printItem: function(ctx, obj) {
        ctx.drawImage(obj.img, obj.x*this.tileSize, obj.y*this.tileSize, this.tileSize, this.tileSize);
      },

      generateFood: function(cols, rows, num) {
        for(var i = 0; i < num; i++) {
          elements.push(this.getFood(cols, rows));
        }
      },

      getFood: function(cols, rows) {
        var obj = this.getImage();
        return {
          x: Math.floor(Math.random()*cols-1)+1,
          y: Math.floor(Math.random()*rows-1)+1,
          id: _ID,
          img: obj.img,
          pts: obj.pts
        }
      },

      getElements: function() {
        return elements;
      }
    }
  });
})();
