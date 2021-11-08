"use strict";

class Draw {
  constructor(imageName) {
    this.canvas = document.getElementById("puzzle-grid");
    this.ctx = this.canvas.getContext("2d");
    this.img = new Image();
    this.imageSrc = "images/" + imageName + ".jpeg";
  }

  init(grid) {
    this.canvas.height = this.canvas.width;
    this.img.addEventListener("load", this.grid.bind(this, grid));
    this.img.src = this.imageSrc;

    this.canvas.parentNode.style.display = "block";
  }

  grid(grid) {
    this.reset();

    let n = Math.sqrt(grid.length);
    let sourceTileSize = getLower(this.img.width, this.img.height) / n;
    let tileSize = this.canvas.width / n;

    for (let i = 0; i < grid.length; i++) {
      let tile = grid[i];

      this.ctx.drawImage(
        this.img,
        (tile % n) * sourceTileSize,
        Math.floor(tile / n) * sourceTileSize,
        sourceTileSize,
        sourceTileSize,
        (i % n) * tileSize,
        Math.floor(i / n) * tileSize,
        tileSize,
        tileSize
      );
    }
  }

  solution() {
    this.reset();

    this.ctx.drawImage(
      this.img,
      0,
      0,
      getLower(this.img.width, this.img.height),
      getLower(this.img.width, this.img.height),
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  reset() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
