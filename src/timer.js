"use strict";

function timer() {
  var translateMonth = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"
  ];

  // value in milliseconds
  var sec = 1000;
  var min = sec * 60;
  var hour = min * 60;
  var day = hour * 24;

  function parseDate(date) {
    var day = date.getDate().toString();
    var month = translateMonth[date.getMonth()];
    var year = (date.getYear() + 1900).toString();

    return `${day} ${month} ${year}`;
  }

  function timeDifference(targetDate) {
    var difference = targetDate - Date.now();

    var days = Math.floor(difference / day);
    var hours = Math.floor((difference - days * day) / hour);
    var mins = Math.floor((difference - days * day - hours * hour) / min);
    var seconds = Math.floor(
      (difference - days * day - hours * hour - mins * min) / sec
    );

    return {
      days: days,
      hours: hours,
      mins: mins,
      seconds: seconds
    };
  }

  function updateTimer() {
    var currentDate = document.querySelector("#current-date");
    var countdown = document.querySelector("#countdown");
    currentDate.textContent = parseDate(new Date(Date.now()));
    countdown.textContent = `${timeDifference(XMAS).days} giorni, ${
      timeDifference(XMAS).hours
    } ore,
    ${timeDifference(XMAS).mins} minuti, ${
      timeDifference(XMAS).seconds
    } secondi`;
    requestAnimationFrame(updateTimer);
  }

  return {
    start: updateTimer
  };
}
