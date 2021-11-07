let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

class Draw {
  constructor(imageName) {
    this.img = new Image();
    this.imageSrc = "images/" + imageName + ".jpeg";
  }

  init(grid) {
    this.img.addEventListener("load", this.grid.bind(this, grid));
    this.img.src = this.imageSrc;
  }

  grid(grid) {
    this.reset();

    let n = Math.sqrt(grid.length);
    let sourceTileSize = getLower(this.img.width, this.img.height) / n;
    let tileSize = canvas.width / n;

    for (let i = 0; i < grid.length; i++) {
      let tile = grid[i];

      ctx.drawImage(
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

    ctx.drawImage(
      this.img,
      0,
      0,
      getLower(this.img.width, this.img.height),
      getLower(this.img.width, this.img.height),
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  reset() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
