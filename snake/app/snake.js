/**
 * Created by andrii on 12/20/15.
 */

(function() {
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      container = document.getElementById("container") || document.body,
      points = 0,
      TILE_SIZE = 15, ROWS = 35, COLS = 40,
      UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39, SPACE = 32,
      APPLE = 2, SNAKE = 1,
      GAME_OVER = false;

  /**
   * Apple object
   * @type {{x: null, y: null, init: apple.init, print: apple.print, render: apple.render}}
   */
  var apple = {
    x: null,
    y: null,
    init: function() {
      this.x = Math.floor(Math.random()*COLS);
      this.y = Math.floor(Math.random()*ROWS);
    },
    print: function(x,y) {
      ctx.fillStyle = "#ff0";
      ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    },
    render: function() {
      this.print(this.x, this.y);
    }
  };

  /**
   * Snake object
   * @type {{queue: Array, direction: number, init: snake.init, print: snake.print, controls: snake.controls}}
   */
  var snake = {
    controlsInitialized: null,
    defaultLength: 3,
    queue: null,
    direction: RIGHT,
    /**
     * initialize snake
     * @param x
     * @param y
     */
    init: function(x,y,len) {
      this.queue = [];
      if(!this.controlsInitialized) this.controls();

      for(var i = 0; i < (len || this.defaultLength); i++) {
        this.queue[i] = {x:x-i, y:y};
      }

      this.render();

    },
    /**
     * print snake object
     * @param x
     * @param y
     */
    print: function(x,y) {
      ctx.fillStyle = "#09c";
      ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    },
    /**
     * add control functions
     */
    controls: function() {
      this.controlsInitialized = document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
          case UP:
            if(this.direction !== DOWN) this.direction = UP;
            break;
          case DOWN:
            if(this.direction !== UP) this.direction = DOWN;
            break;
          case LEFT:
            if(this.direction !== RIGHT) this.direction = LEFT;
            break;
          case RIGHT:
            if(this.direction !== LEFT) this.direction = RIGHT;
            break;
        }

      }.bind(this));
    },

    move: function() {
      var tail = this.queue.pop(),
          head = this.queue[0];

      tail.x = head.x;
      tail.y = head.y;

      switch(this.direction) {
        case LEFT:
          tail.x -= 1;
          break;
        case RIGHT:
          tail.x += 1;
          break;
        case UP:
          tail.y -= 1;
          break;
        case DOWN:
          tail.y += 1;
          break;
      }

      this.queue.unshift(tail);
      this.render();
    },

    add: function() {
      var tail = this.queue[this.queue.length-1],
          el = {x: tail.x, y:tail.y};

      switch(this.direction) {
        case LEFT:
          el.x += 1;
          break;
        case RIGHT:
          el.x -= 1;
          break;
        case UP:
          el.y += 1;
          break;
        case DOWN:
          el.y -= 1;
          break;
      }

      this.queue.push(el);
      points += 1;
    },

    render: function() {
      if(this.collision(this.queue[0], apple)) {
        apple.init();
        this.add();
      }

      if(this.queue[0].x >= COLS || this.queue[0].x < 0
      || this.queue[0].y >= ROWS || this.queue[0].y < 0) {
        GAME_OVER = true;
        return;
      }

      for(var i = 0; i < this.queue.length; i++) {
        this.print(this.queue[i].x, this.queue[i].y);
        if(i !== 0 && this.collision(this.queue[0], this.queue[i])) {
          GAME_OVER = true;
        }
      }
    },

    collision: function(a, b) {
      return a.x === b.x && a.y === b.y;
    }
  };

  var game = {
    speed: 100,
    init: function() {
      canvas.width = TILE_SIZE * COLS;
      canvas.height = TILE_SIZE * ROWS;
      container.appendChild(canvas);
      snake.init(Math.floor(COLS/2), Math.floor(ROWS/2), 4);
      apple.init();
      this.loop();
      this.controls();
      this.printPoints();
    },
    loop: function() {
      var timer = setInterval(function() {
        if(GAME_OVER) {
          clearInterval(timer);
          this.gameOver();
        } else {
          ctx.clearRect(0,0, COLS*TILE_SIZE, ROWS*TILE_SIZE);
          this.printPoints();
          apple.render();
          snake.move();
        }

      }.bind(this), this.speed);
    },
    gameOver: function() {
      ctx.clearRect(0,0, COLS*TILE_SIZE, ROWS*TILE_SIZE);
      ctx.fillStyle = "black";
      ctx.font = "bold 12pt monospace";
      ctx.textAlign = "center";
      ctx.fillText("game over", canvas.width/2, canvas.height/2);
      ctx.font = "10pt monospace";
      ctx.fillText("press space to start again", canvas.width/2, canvas.height/2+20);
    },
    printPoints: function() {
      ctx.fillStyle = "#999";
      ctx.font = "8pt monospace";
      ctx.textAlign = "left";
      ctx.fillText("points: "+points, 5, canvas.height-5);
    },
    restart: function() {
      GAME_OVER = false;
      points = 0;
      apple.init();
      snake.init(Math.floor(COLS/2), Math.floor(ROWS/2), 4);
      this.loop();
    },
    controls: function() {
      document.addEventListener("keyup", function(e) {
        switch(e.keyCode) {
          case SPACE:
            if(GAME_OVER) this.restart();
            break;
        }
      }.bind(this));
    }
  };

  game.init();

})();
