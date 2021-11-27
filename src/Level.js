"use strict";

class Level {
  constructor(number) {
    this.number = number;
    this.tilesNumber = 9;
    this.tiles = new Grid(this.tilesNumber);
    this.draw = new Draw(this.number);
    this.startMove = null;

    this.init();
  }

  init() {
    this.tiles.shuffle();
    this.draw.init(this.tiles.tiles);

    document.addEventListener("keydown", this.handleKeyPress.bind(this));
    // movement must start inside the canvas
    this.draw.canvas.addEventListener("mousedown", this.moveStart.bind(this));
    document.addEventListener("mouseup", this.moveEnd.bind(this));
  }

  get won() {
    let result = true;
    let solution = this.tiles.tiles;
    for (let i = -1; i < solution.length - 1; i++) {
      if (solution.at(i) !== i) {
        result = false;
        break;
      }
    }

    return result;
  }

  checkWin() {
    if (this.won) {
      console.log("WINNER");
      this.draw.solution();
    }
  }

  moveStart(event) {
    this.startMove = getCoord(event);
  }

  moveEnd(event) {
    if (not(isNull)(this.startMove)) {
      let endMove = getCoord(event);

      let movements = {
        x: endMove.x - this.startMove.x,
        y: endMove.y - this.startMove.y
      };

      let movement = greaterAbs(movements);

      if (this.tiles.move(getDirection(movement))) {
        this.draw.grid(this.tiles.tiles);

        this.checkWin();
      }
    }

    this.startMove = null;

    function greaterAbs({ x, y }) {
      return Math.abs(x) > Math.abs(y) ? { x } : { y };
    }

    function getDirection(movement) {
      let result;

      let [axis, value] = Object.entries(movement)[0];

      if (axis === "x") {
        result = value > 0 ? "right" : "left";
      } else if (axis === "y") {
        result = value > 0 ? "down" : "up";
      }

      return result;
    }
  }

  handleKeyPress(event) {
    if (/^Arrow/.test(event.key)) {
      let direction = event.key.match(/^Arrow([a-zA-Z]+)/)[1].toLowerCase();
      if (this.tiles.move(direction)) {
        this.draw.grid(this.tiles.tiles);

        this.checkWin();
      }
    }
  }
}
