"use strict";

class Level {
  constructor(number) {
    this.number = number;
    this.tilesNumber = 9;
    this.tiles = new Grid(this.tilesNumber);
    this.draw = new Draw(this.number);

    this.init();
  }

  init() {
    this.tiles.shuffle();
    this.draw.init(this.tiles.tiles);

    document.addEventListener("keydown", this.handleClick.bind(this));
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

  handleClick(ev) {
    if (/^Arrow/.test(ev.key)) {
      let direction = ev.key.match(/^Arrow([a-zA-Z]+)/)[1].toLowerCase();
      if (this.tiles.move(direction)) {
        this.draw.grid(this.tiles.tiles);

        if (this.won) {
          console.log("WINNER");
          this.draw.solution();
        }
      }
    }
  }
}
