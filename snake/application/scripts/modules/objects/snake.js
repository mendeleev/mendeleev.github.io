(function() {
  define("modules/objects/snake", [], function() {
    var size = 3,
      _ID = 1,
      _LEFT = 37,
      _RIGHT = 39,
      _UP = 38,
      _DOWN = 40,
      _APPLE = 2,
      elements, direction;

    return {
      cols: 0,
      rows: 0,
      tileSize: 0,
      gameOver: false,
      pts: 0,

      /**
       * Snake initialize function
       */
      init: function(cols, rows, tileSize) {
        this.gameOver = false;
        direction = _RIGHT;
        elements = [];
        this.pts = 0;
        this.cols = cols,
        this.rows = rows,
        this.tileSize = tileSize,

        this.initElements(cols, rows);
        this.initEvents();
      },

      getId: function() {
        return _ID;
      },

      /**
       * Returns a collection of elements with snake coordinates
       * @return {Array} - collection with coordinates
       */
      getElements: function() {
        return elements;
      },

      /**
       * Prints one cell styled for snake object
       */
      printItem: function(ctx, coords) {
        ctx.fillStyle = "green";
        ctx.fillRect(coords.x*this.tileSize, coords.y*this.tileSize, this.tileSize, this.tileSize);
      },

      /**
       * Initialize snake elements
       */
      initElements: function(cols, rows) {
        var x = Math.floor(cols/2),
          y = Math.floor(rows/2);

        for(var i = 0; i < size; i++) {
          elements.push(this.getElement(x+i, y));
        }
      },

      /**
       * Creates a new element for a snake cell
       * @return {Object} - snake cell
       */
      getElement: function(x, y) {
        return {
          x: x,
          y: y,
          id: _ID
        }
      },

      getLength: function() {
        return elements.length;
      },

      /**
       * Event handlers
       * @listens keyup
       */
      initEvents: function() {
        document.addEventListener("keyup", function(e) {
          switch(true) {
            case Boolean(e.keyCode === _UP && direction !== _DOWN):
            case Boolean(e.keyCode === _DOWN && direction !== _UP):
            case Boolean(e.keyCode === _LEFT && direction !== _RIGHT):
            case Boolean(e.keyCode === _RIGHT && direction !== _LEFT):
              direction = e.keyCode;
          }
        }.bind(this));
      },

      /**
       * Moves snake
       */
      move: function() {
        var tail = elements.shift(),
          head = elements[elements.length-1];

        switch(direction) {
          case _UP:
            tail.y = head.y-1;
            tail.x = head.x;
            break;
          case _DOWN:
            tail.y = head.y+1;
            tail.x = head.x;
            break;
          case _LEFT:
            tail.y = head.y;
            tail.x = head.x-1;
            break;
          case _RIGHT:
            tail.y = head.y;
            tail.x = head.x+1;
            break;
        }

        this.gameOver = this.isOverboard(tail) || this.isBitten(tail);
        elements.push(tail);
      },

      increase: function() {
        var tail = this.getElement(elements[0].x, elements[0].y);
        switch(direction) {
          case _UP:
            tail.y += 1;
            break;
          case _DOWN:
            tail.y -= 1;
            break;
          case _LEFT:
            tail.x += 1;
            break;
          case _RIGHT:
            tail.x -= 1;
            break;
        }

        elements.unshift(tail);
        this.pts += 1;
      },

      /**
       * Checks if snake is out of border
       * @return {Boolean}
       */
      isOverboard: function(coords) {
        return coords.x < 0 || coords.x > this.cols-1 ||
          coords.y < 0 || coords.y > this.rows-1;
      },

      /**
       * Checks if snake is bitten by itself
       * @return {Boolean}
       */
      isBitten: function(coords) {
        for(var i = 0; i < elements.length; i++) {
          if(elements[i].x === coords.x && elements[i].y === coords.y) {
            return true;
          }
        }

        return false;
      },

      detectCollision: function(apples) {
        var head = elements[elements.length-1];
        for(var i = 0; i < apples.length; i++) {
          if(head.x === apples[i].x && head.y === apples[i].y) {
            this.collisionWith(apples[i], apples);
            break;
          }
        }
      },

      collisionWith: function(obj, apples) {
        switch (obj.id) {
          case _APPLE:
            this.increase();
            break;
          default:
            console.log("collision with unknown object");
        }

        if(apples.indexOf(obj) >= 0) {
          apples.splice(apples.indexOf(obj), 1);
        }
      }

    }
  })

})();
