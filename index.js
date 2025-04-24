import { bubbleSort, insertionSort, quickSort } from "./sort.js";
import { generateRandomArray, renderBars } from "./utils.js";

const shuffleBtn = document.getElementById("shuffle-btn");
const speedSlider = document.getElementById("speed-slider");
const sortBtn = document.getElementById("sort-btn");
const algoMenu = document.getElementById("algo-menu");

let arr = [];
const maxSpeed = 0.0005;
let waitTime = speedSlider.value * maxSpeed; // default wait time

// getter for wait time
export function getWaitTime() {
  return waitTime;
}

// when html is parsed, generate random array and render bars
document.addEventListener("DOMContentLoaded", () => {
  arr = generateRandomArray(25, [5, 100]);
  renderBars(arr);
});

// shuffle when shuffle button is clicked
shuffleBtn.addEventListener("click", () => {
  arr = generateRandomArray(25, [5, 100]);
  renderBars(arr);
  sortBtn.disabled = false; // enable sort button
});

// update speed when slider is changed
speedSlider.addEventListener("input", () => {
  waitTime = (speedSlider.max - speedSlider.value + 1) * maxSpeed; // scale wait time based on slider value
});

// sort when sort button is clicked
sortBtn.addEventListener("click", async () => {
  shuffleBtn.disabled = true; // disable shuffle button
  sortBtn.disabled = true;

  if (algoMenu.value === "bubble") {
    await bubbleSort(arr);
  } else if (algoMenu.value === "insertion") {
    await insertionSort(arr);
  } else if (algoMenu.value === "quick") {
    await quickSort(arr);
  }

  shuffleBtn.disabled = false; // enable shuffle button
});
