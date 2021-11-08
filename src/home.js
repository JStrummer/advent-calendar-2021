"use strict";

function initHome() {
  let home = document.getElementById("home");
  let root = document.getElementById("calendar-container");
  let img = document.getElementById("calendar");
  let sourceStep = img.width / 5;
  let today = Date.now();

  timer().start();

  arrayFromRange(1, 25).forEach((day, index) => {
    let canvas = document.createElement("canvas");
    canvas.classList.add("calendar-box");
    if (today < new Date(2021, 10, day)) {
      canvas.classList.add("blocked");
    }
    canvas.dataset.day = day;
    canvas.width = canvas.height = root.offsetWidth / 5;

    let ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      (index % 5) * sourceStep,
      Math.floor(index / 5) * sourceStep,
      sourceStep,
      sourceStep,
      0,
      0,
      canvas.width,
      canvas.height
    );

    if (canvas.classList.contains("blocked")) {
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    root.appendChild(canvas);
  });
}
