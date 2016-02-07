(function() {

	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		CELL = "#";

		

	var app = {
		file: "learn_and_teach.in",
		color: "#0099cc",
		tile: 10,
		gap:1,
		rows: 0,
		cols: 0,
		data: [],

		init: function() {
			var gap = document.getElementById("gap"),
				tile = document.getElementById("tile"),
				color = document.getElementById("color"),
				file = document.getElementById("file");

			this.tile = Number(tile.value);
			this.gap = Number(gap.value);
			this.color = color.value;
			this.file = file.value;

			this.events();
			this.getData();
		},

		events: function() {
			$('form').on("change", function(e) {
				switch(e.target.name) {
					case "file":
						this[e.target.name] = e.target.value;
						this.getData();
						break;
					case "gap":
					case "tile":
						this[e.target.name] = Number(e.target.value);
						canvas.height = this.rows * this.tile;
						canvas.width = this.cols * this.tile;
						this.render(this.data);
						break;
					default:
						this[e.target.name] = e.target.value;
						this.render(this.data);
				}
				
			}.bind(this));
		},

		render: function(data) {
			ctx.clearRect(0,0,canvas.width,canvas.height);
			for(var i = 0; i < data.length; i++) {
				if(data[i] && data[i].length > 0) {
					console.log(data[i]);
					this.printRow(i, data[i]);
				}
			}
		},

		printRow: function(y, data) {
			for(var i = 0; i < data.length; i++) {
				if(data[i] === CELL) {
					this.printCell(i, y);
				}
			}
		},

		printCell: function(x, y) {
			ctx.fillStyle = this.color;
			ctx.fillRect(x*this.tile+this.gap,y*this.tile+this.gap,this.tile-this.gap, this.tile-this.gap);
		},

		getData: function() {
			return $.ajax({
				url: ["files", this.file].join("/"),
				success: function(response) {
					var data = response.split("\n"),
						params = data[0].split(" ");

					this.rows = params[0];
					this.cols = params[1];	

					canvas.height = params[0] * this.tile;
					canvas.width = params[1] * this.tile;

					this.data = data.splice(1,data.length).map(function(item) {
						return item.split("");
					});	

					this.render(this.data);
				}.bind(this)
			});
		}		
	};

	var robot = {
		instructions: "PAINT_LINE 0 8 0 13,PAINT_LINE 1 4 1 16,PAINT_LINE 1 64 10 64,PAINT_LINE 2 2 9 2,PAINT_LINE 2 14 2 16,PAINT_LINE 2 64 10 64,PAINT_LINE 3 1 8 1,PAINT_LINE 3 64 10 64,PAINT_LINE 4 0 4 4,PAINT_LINE 4 24 4 31,PAINT_LINE 4 38 4 45,PAINT_LINE 4 52 4 62,PAINT_LINE 4 64 10 64,PAINT_LINE 4 71 4 77,PAINT_LINE 5 0 5 3,PAINT_LINE 5 10 5 20,PAINT_LINE 5 22 10 22,PAINT_LINE 5 29 5 33,PAINT_LINE 5 36 9 36,PAINT_LINE 5 43 5 47,PAINT_LINE 5 51 10 51,PAINT_LINE 5 57 5 62,PAINT_LINE 5 64 10 64,PAINT_LINE 5 69 9 69,PAINT_LINE 5 75 5 79,PAINT_LINE 6 0 6 3,PAINT_LINE 6 16 10 16,PAINT_LINE 6 21 9 21,PAINT_LINE 6 30 6 34,PAINT_LINE 6 35 6 39,PAINT_LINE 6 45 10 45,PAINT_LINE 6 50 9 50,PAINT_LINE 6 59 13 59,PAINT_LINE 6 64 10 64,PAINT_LINE 6 68 9 68,PAINT_LINE 6 74 6 80,PAINT_LINE 7 1 7 4,PAINT_LINE 7 16 10 16,PAINT_LINE 7 21 7 24,PAINT_LINE 7 31 10 31,PAINT_LINE 7 35 7 38,PAINT_LINE 7 45 10 45,PAINT_LINE 7 50 9 50,PAINT_LINE 7 59 13 59,PAINT_LINE 7 64 10 64,PAINT_LINE 7 68 7 75,PAINT_LINE 8 2 8 6,PAINT_LINE 8 14 8 18,PAINT_LINE 8 21 8 25,PAINT_LINE 8 30 8 33,PAINT_LINE 8 36 8 39,PAINT_LINE 8 44 8 48,PAINT_LINE 8 50 8 53,PAINT_LINE 8 59 13 59,PAINT_LINE 8 64 8 67,PAINT_LINE 8 68 8 72,PAINT_LINE 8 77 10 77,PAINT_LINE 9 4 9 17,PAINT_LINE 9 22 9 32,PAINT_LINE 9 37 9 47,PAINT_LINE 9 51 9 62,PAINT_LINE 9 64 9 67,PAINT_LINE 9 70 9 79,PAINT_LINE 10 59 13 59,PAINT_LINE 11 50 11 53,PAINT_LINE 11 58 11 62,PAINT_LINE 12 51 12 60,PAINT_LINE 13 54 13 57",
		data: [],
		init: function() {
			canvas.width = 800;
			canvas.height = 300;

			var data = this.instructions.split(",").map(function(item) {
				return item.split(" ");
			});
			
			data.map(function(item) {
				this.printLine(item);
			}.bind(this));
		},

		printLine: function(data) {
			var x = [Number(data[2]), Number(data[4])],
				y = [Number(data[1]), Number(data[3])];

			for(var i = y[0]; i <= y[1]; i++) {
				for(var j = x[0]; j <= x[1]; j++) {
					app.printCell(j, i);
				}
			}
		}
	};

	app.init();
	// robot.init();


})();