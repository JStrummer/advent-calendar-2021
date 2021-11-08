"use strict";

class Grid {
  constructor(tilesNumber) {
    this.tiles = arrayFromRange(-1, tilesNumber - 2);
    this.width = Math.sqrt(tilesNumber);
  }

  shuffle() {
    let shuffled = shuffleArray(this.tiles);

    if (!this.isSolvable(shuffled)) {
      let emptyTileIndex = shuffled.indexOf(-1);

      if (emptyTileIndex !== 0 && emptyTileIndex !== 1) {
        shuffled = swapFirstTwo(shuffled);
      } else {
        shuffled = swapLastTwo(shuffled);
      }

      if (!this.isSolvable(shuffled)) {
        console.error(`cannot get a solvable puzzle: ${shuffled.toString()}`);
      }
    }

    this.tiles = shuffled;
  }

  move(direction) {
    let emptyTileIndex = this.tiles.indexOf(-1);
    let nextTileIndex = emptyTileIndex + getNext(direction, this.width);

    if (
      (direction === "right" || direction === "left") &&
      this.getRow(emptyTileIndex) !== this.getRow(nextTileIndex)
    ) {
      return false;
    }

    this.tiles = swapTwo(this.tiles, emptyTileIndex, nextTileIndex);

    return true;

    function getNext(direction, width) {
      let nextIndex = {
        right: -1,
        left: 1,
        up: width,
        down: width * -1
      };
      return nextIndex[direction];
    }
  }

  isSolvable(array) {
    if (isOdd(this.width)) {
      return isEven(countInversions(array));
    } else {
      let row = this.getRow(array.indexOf(-1));
      let rowFromBottom = this.width - row;

      if (isOdd(rowFromBottom)) {
        return isEven(countInversions(array));
      } else {
        return isOdd(countInversions(array));
      }
    }

    function countInversions(array) {
      // https://developerslogblog.wordpress.com/2020/04/01/how-to-shuffle-an-slide-puzzle/
      let result = 0;

      for (let i = 0; i < array.length; i++) {
        let current = array[i];

        if (current !== undefined && current >= 0) {
          // skip empty element (-1)
          for (let j = i + 1; j < array.length; j++) {
            let next = array[j];

            if (next !== undefined && next >= 0 && current > next) {
              result++;
            }
          }
        }
      }

      return result;
    }
  }

  getRow(tileIndex) {
    return Math.floor(tileIndex / this.width);
  }
}
