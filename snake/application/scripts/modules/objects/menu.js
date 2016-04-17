(function() {
  define("modules/objects/menu", [], function() {

    return {
      ctx: 0,
      cols: 0,
      rows: 0,
      tileSize: 0,
      width: 0,
      height: 0,

      init: function(cols, rows, tileSize) {
        this.cols = cols;
        this.rows = rows;
        this.tileSize = tileSize;
        this.width = this.cols * this.tileSize;
        this.height = this.rows * this.tileSize;
      },

      gameOver: function(ctx, pts) {
        var best = this.getBestScore() > pts ? this.getBestScore() : pts;

        ctx.clearRect(0, 0, this.cols*this.tileSize, this.rows*this.tileSize);
        ctx.font = "bold 20px serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", this.width/2, this.height/2-40);

        ctx.font = "16px serif";
        ctx.textAlign = "center";
        ctx.fillText("press <Enter> to start a new game", this.width/2, this.height/2-20);

        ctx.font = "16px serif";
        ctx.textAlign = "center";
        ctx.fillText("your score is: "+(pts || 0), this.width/2, this.height - 100);

        ctx.font = "16px serif";
        ctx.textAlign = "center";
        ctx.fillText("the best score is: " + best, this.width/2, this.height - 80);

        this.setBestScore(best);
      },

      getBestScore: function() {
        return localStorage.getItem("bestScore") || 0;
      },

      setBestScore: function(pts) {
        return localStorage.setItem("bestScore", (pts || 0));
      }
    }
  });
})();
