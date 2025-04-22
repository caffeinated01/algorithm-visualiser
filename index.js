import { bubbleSort } from "./sort.js";
import { generateRandomArray, renderBars, wait } from "./utils.js";

let arr = [];
export let waitTime = 0.1; // default wait time
export const highlightWaitTime = 0.3;

const shuffleBtn = document.getElementById("shuffle-btn");
const speedSlider = document.getElementById("speed-slider");
const sortBtn = document.getElementById("sort-btn");

// when html is parsed, generate random array and render bars
document.addEventListener("DOMContentLoaded", () => {
  arr = generateRandomArray(10);
  renderBars(arr);
});

// shuffle when shuffle button is clicked
shuffleBtn.addEventListener("click", () => {
  arr = generateRandomArray(10);
  renderBars(arr);
  sortBtn.disabled = false; // enable sort button
});

// update speed when slider is changed
speedSlider.addEventListener("input", () => {
  waitTime = speedSlider.value / 10;
});

// sort when sort button is clicked
sortBtn.addEventListener("click", async () => {
  shuffleBtn.disabled = true; // disable shuffle button
  await bubbleSort(arr);
  sortBtn.disabled = true;
  shuffleBtn.disabled = false; // disable shuffle button
});
