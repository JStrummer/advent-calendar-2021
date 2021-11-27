"use strict";

function arrayFromRange(min, max) {
  let result = [];

  for (let i = min; i <= max; i++) {
    result.push(i);
  }

  return result;
}

function shuffleArray(array) {
  let source = [...array];
  let result = [];

  while (source.length > 0) {
    let index = randomIndex(source);
    result.push(source[index]);

    source = source.filter((el, i) => i !== index);
  }

  return result;

  function randomIndex(array) {
    return Math.floor(Math.random() * (array.length - 1));
  }
}

function swapFirstTwo(array) {
  return swapTwo(array, 0, 1);
}

function swapLastTwo(array) {
  return swapTwo(array, array.length - 1, array.length - 2);
}

function swapTwo(array, firstIndex, secondIndex) {
  let result = [...array];

  if (isDef(array[firstIndex]) && isDef(array[secondIndex])) {
    result[firstIndex] = array[secondIndex];
    result[secondIndex] = array[firstIndex];
  }

  return result;
}

function isEven(number) {
  return number === 0 || number % 2 === 0;
}

function isOdd(number) {
  return !isEven(number);
}

// if a === b return b
function getLower(a, b) {
  return a < b ? a : b;
}

function isUndefined(v) {
  return v === undefined;
}

function isDef(v) {
  return not(isUndefined)(v);
}

function isNull(v) {
  return v === null;
}

function not(fn) {
  return function negate(...args) {
    return !fn(...args);
  };
}

function getCoord(event) {
  return { x: event.offsetX, y: event.offsetY };
}
