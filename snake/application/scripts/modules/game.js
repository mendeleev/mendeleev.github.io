(function() {
  define("modules/game",
  [
    "modules/objects/snake",
    "modules/objects/food",
    "modules/objects/menu"
  ],
  function(snake, food, menu) {
    var _TILE_SIZE = 24,
      _COLS = 30,
      _ROWS = 25,
      _APPLES = 5,
      /*keys*/
      _ENTER = 13,
      container, canvas, ctx;

    return {
      frame:0,
      pts: 0,
      /**
       * initialize the game
       */
      init: function() {
        snake.init(_COLS, _ROWS, _TILE_SIZE);
        food.init(_COLS, _ROWS, _TILE_SIZE, _APPLES);
        menu.init(_COLS, _ROWS, _TILE_SIZE);
        this.boardInit(_COLS,_ROWS,_TILE_SIZE);
        this.initEvents();
        this.gameLoop();
        this.render();
      },

      /**
       * creates a new game world
       */
      boardInit: function(cols, rows, tileSize) {
        container = document.getElementById("container");
        container.innerHTML=""; //clear container

        canvas = document.createElement("canvas");
        canvas.width = (cols || 40) * (tileSize || 10);
        canvas.height = (rows || 30) * (tileSize || 10);

        container.appendChild(canvas);
        ctx = canvas.getContext('2d');
      },

      /**
       * Initialize event listeners
       * @listens keyup
       */
      initEvents: function() {
        document.addEventListener("keyup", function(e) {
          switch(e.keyCode) {
            case _ENTER:
              if(snake.gameOver) {
                this.init();
              }
              break;
          }
        }.bind(this));
      },

      /**
       * Print lines between cells
       */
      printGrid: function(cols, rows, tileSize) {
        for(var i = 1; i < rows; i++) {
          ctx.beginPath();
          ctx.moveTo(0,tileSize*i);
          ctx.lineWidth = 0.05;
          ctx.lineTo(cols*tileSize, tileSize*i);
          ctx.closePath();
          ctx.stroke();
        }

        for(var j = 1; j < cols; j++) {
          ctx.beginPath();
          ctx.moveTo(tileSize*j, 0);
          ctx.lineWidth = 0.05;
          ctx.lineTo(tileSize*j, rows*tileSize);
          ctx.closePath();
          ctx.stroke();
        }
      },

      /**
       * Prints one item
       */
      printItem: function(obj, tileSize) {
        switch(obj.id) {
          /*check if that is a snake cell*/
          case snake.getId():
            snake.printItem(ctx, obj);
            break;
          /*check if that is a food cell*/
          case food.getId():
            food.printItem(ctx, obj);
            break;
          /*for unknown objects in case of something goes wrong*/
          default:
            ctx.fillStyle = "grey";
            ctx.fillRect(obj.x*tileSize, obj.y*tileSize, tileSize, tileSize);
        }
      },

      printPoints: function() {
        ctx.fillStyle = "grey";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "right";
        ctx.fillText("score: "+snake.pts, _COLS *_TILE_SIZE-5, 15);
      },

      /**
       * render all elements
       */
      render: function() {
        ctx.clearRect(0,0,_COLS*_TILE_SIZE, _ROWS*_TILE_SIZE);
        var snakeElements = snake.getElements(),
          apples = food.getElements(),
          elements = apples.concat(snakeElements);

        snake.detectCollision(apples);

        if(apples.length < _APPLES) {
          food.generateFood(_COLS, _ROWS, _APPLES-apples.length);
        }

        this.printGrid(_COLS, _ROWS, _TILE_SIZE);

        for(var i = 0; i < elements.length; i++) {
          this.printItem(elements[i], _TILE_SIZE);
        }

        this.printPoints();
      },

      gameLoop: function() {
        var timer = setInterval(function() {
          if(!snake.gameOver) {
            snake.move();
            this.render();
          } else {
            clearInterval(timer);
            menu.gameOver(ctx, snake.pts);
          }
        }.bind(this), 1000/10);
      }

    }
  });
})();
