"use strict";

calendarImage.addEventListener("load", () => {
  initHome();
  goToHome();
});

const homeButton = document.getElementById("home-button");
homeButton.addEventListener("click", ev => {
  ev.preventDefault();
  goToHome();
});

let level = null;

document.addEventListener("click", ev => {
  let { day } = ev.target.dataset;
  if (isDef(day) && !ev.target.classList.contains("blocked")) {
    goToPuzzle(day);
  }
});

function goToHome() {
  home.style.display = "block";
  puzzle.style.display = "none";

  level = null;
}

function goToPuzzle(level) {
  home.style.display = "none";
  puzzle.style.display = "block";

  level = new Level(level);
}
