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
}
