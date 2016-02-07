(function() {

	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");

	
	var robot = {
		instructions: "",
		data: [],
		color: "#009999",
		tile: 2,
		gap: 1,
		init: function() {
			this.render(this.instructions);
		},

		render: function(instructions) {
			canvas.width = 800;
			canvas.height = 300;

			var data = instructions.split(",").map(function(item) {
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
					this.printCell(j, i);
				}
			}
		},

		printCell: function(x, y) {
			ctx.fillStyle = this.color;
			ctx.fillRect(x*this.tile+this.gap,y*this.tile+this.gap,this.tile-this.gap, this.tile-this.gap);
		}
	};		


	var builder = {
		file: "learn_and_teach.in",
		data: [],
		coords: [],
		instructions: [],
		rows: 0,
		cols: 0,

		init: function() {
			this.getData(this.file).done(function(data) {
				this.data = data;
				this.scan(this.data);
			}.bind(this));
		},

		getData: function(fileName) {
			return $.ajax({
				url: ["files", fileName].join("/")
			}).then(function(response) {
				var data = response.split("\n"),
					params = data[0].split(" ");

				this.rows = params[0];
				this.cols = params[1];

				return data.splice(1, data.length).map(function(item) {
					return item.split("");
				});

			}.bind(this));
		},

		scan: function(data) {
			var x, y,
				horisontal = [],
				vertical = [];

			for(y = 0; y < data.length; y++) {
				if(!this.coords[y]) this.coords[y] = [];
				for(x = 0; x < data[y].length; x++) {
					if(data[y][x] === "#" && this.coords[y].indexOf(x) < 0) {
						/*check horisontal*/
						horisontal = [];
						for(var i = x; i < this.data[y].length; i++) {
							horisontal.push(i);
							if(this.data[y][i+1] !== "#") break;
						}

						/*check vertical*/
						vertical = [];
						for(var j = y; j < this.data.length; j++) {
							vertical.push(j);
							if(this.data[j+1][x] !== "#") break;
						}

						if((i-x) < (j-y)) {
							this.instructions.push(this.getInstruction([x, x], [y,j], 0, "line"));
							for(var tmp = 0; tmp < vertical.length; tmp++) {
								if(!this.coords[y+tmp]) this.coords[y+tmp] = [];
								this.coords[y+tmp].push(horisontal[0]);
							}
						} else if((i-x) >= (j-y)) {
							this.instructions.push(this.getInstruction([x, i], [y,y], 0, "line"));
							this.coords[y] = this.coords[y].concat(horisontal);
							x = i;
						} else {
							console.log("something goes wrong", x,y);
						}
					}
				}
			}

			console.log([this.instructions.length].concat(this.instructions).join("\n"));

			robot.render(this.instructions.join(","));
		},

		get: function(x, y) {
			var horisontal = 0,
				vertical = 0,
				i;

			/*check horisontal*/
			for(i = x; i < this.data[y].length; i++) {
				if(this.data[y][i+1] !== "#") break;
				horisontal += 1;
			}	

			/*check vertical*/
			for(i = y; i < this.data.length; i++) {
				if(this.data[vertical+1][x] !== "#") break;
				vertical += 1;
			}

			console.log(x+horisontal, y+vertical);

			return x+horisontal;

		},

		getInstruction: function(x, y, size, type) {
			var instrunction = "";
			switch(type) {
				case "line":
					instrunction = ["PAINT_LINE", y[0], x[0], y[1], x[1]].join(" ");
					break;
				case "square":
					instrunction = ["PAINT_SQUARE", y[0], x[0], size].join(" ");
					break;
				case "remove":
					instrunction = ["ERASE_CELL", y[0], x[0]];
					break;	
			}

			return instrunction;
		}
	};

	builder.init();

	// robot.init();
	

})();