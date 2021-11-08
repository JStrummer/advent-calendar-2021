"use strict";

function initHome() {
  let home = document.getElementById("home");
  let root = document.getElementById("calendar-container");
  let img = document.getElementById("calendar");
  let sourceStep = img.width / 5;
  let today = Date.now();

  timer().start();
  createBoxes();
  blokFutureDate();
  drawBoxes();

  function createBoxes() {
    arrayFromRange(1, 25).forEach((day, index) => {
      let canvas = document.createElement("canvas");
      canvas.classList.add("calendar-box");

      canvas.dataset.day = day;
      canvas.width = canvas.height = root.offsetWidth / 5;

      root.appendChild(canvas);
    });
  }

  function blokFutureDate() {
    let boxes = document.querySelectorAll(".calendar-box");

    boxes.forEach(box => {
      let { day } = box.dataset;
      if (today < new Date(2021, 10, day)) {
        box.classList.add("blocked");
      }
    });
  }

  function drawBoxes() {
    let boxes = document.querySelectorAll(".calendar-box");

    boxes.forEach((box, index) => {
      let ctx = box.getContext("2d");

      ctx.drawImage(
        img,
        (index % 5) * sourceStep,
        Math.floor(index / 5) * sourceStep,
        sourceStep,
        sourceStep,
        0,
        0,
        box.width,
        box.height
      );

      if (box.classList.contains("blocked")) {
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 0, box.width, box.height);
      }
    });
  }
}
