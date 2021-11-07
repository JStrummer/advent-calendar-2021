"use strict";

let level = new Level(1);

document.addEventListener("keydown", ev => {
  if (/^Arrow/.test(ev.key)) {
    let direction = ev.key.match(/^Arrow([a-zA-Z]+)/)[1].toLowerCase();
    if (level.tiles.move(direction)) {
      level.draw.grid(level.tiles.tiles);

      if (level.won) {
        console.log("WINNER");
        level.draw.solution();
      }
    }
  }
});
