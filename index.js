import { bubbleSort, insertionSort, quickSort } from "./sort.js";
import { linearSearch, binarySearch } from "./search.js";
import {
  generateRandomNumber,
  generateRandomArray,
  renderBars,
} from "./utils.js";

const shuffleBtn = document.getElementById("shuffle-btn");
const speedSlider = document.getElementById("speed-slider");
const startBtn = document.getElementById("start-btn");
const algoMenu = document.getElementById("algo-menu");
const targetDisplay = document.getElementById("target-display");

let arr = [];
const maxSpeed = 0.0005;
let waitTime = speedSlider.value * maxSpeed; // default wait time

// getter for wait time
export function getWaitTime() {
  return waitTime;
}

const sortAlgos = ["bubble", "insertion", "quick"];
const searchAlgos = ["linear", "binary"];
let option = algoMenu.value;

export function checkAlgoType() {
  const sort = sortAlgos.includes(option);
  const search = searchAlgos.includes(option);
  if (sort) {
    return "sort";
  } else if (search) {
    return "search";
  }
}

algoMenu.addEventListener("change", () => {
  targetDisplay.innerText = "";
  option = algoMenu.value;
  if (checkAlgoType() === "sort") {
    startBtn.innerText = "Sort";
    renderBars(arr);
  } else if (checkAlgoType() === "search") {
    startBtn.innerText = "Search";
    renderBars(arr);
  }
});

// when html is parsed, generate random array and render bars
document.addEventListener("DOMContentLoaded", () => {
  arr = generateRandomArray(25, [5, 100]);
  renderBars(arr);
});

// shuffle when shuffle button is clicked
shuffleBtn.addEventListener("click", () => {
  targetDisplay.innerText = "";
  arr = generateRandomArray(25, [5, 100]);
  renderBars(arr);
  startBtn.disabled = false; // enable sort button
});

// update speed when slider is changed
speedSlider.addEventListener("input", () => {
  waitTime = (speedSlider.max - speedSlider.value + 1) * maxSpeed; // scale wait time based on slider value
});

function prepareSearch() {
  let targetIdx = generateRandomNumber(0, arr.length - 1);
  let target = arr[targetIdx];
  targetDisplay.innerText = `Target is ${target} at index ${targetIdx}`;

  return { target, targetIdx };
}

// sort when sort button is clicked
startBtn.addEventListener("click", async () => {
  targetDisplay.innerText = "";
  // disable menu elements
  shuffleBtn.disabled = true;
  startBtn.disabled = true;
  algoMenu.disabled = true;
  switch (checkAlgoType()) {
    case "sort":
      if (algoMenu.value === "bubble") {
        await bubbleSort(arr);
      } else if (algoMenu.value === "insertion") {
        await insertionSort(arr);
      } else if (algoMenu.value === "quick") {
        await quickSort(arr);
      }
      break;
    case "search":
      if (algoMenu.value === "linear") {
        const { target, targetIdx } = prepareSearch();
        await linearSearch(arr, target);
      } else if (algoMenu.value === "binary") {
        arr = arr.sort((a, b) => a - b);
        renderBars(arr);
        const { target, targetIdx } = prepareSearch();
        targetDisplay.innerText = `Sorted array for Binary Search; Target is ${target} at index ${targetIdx}`;
        await binarySearch(arr, target, 0, arr.length - 1);
      }
      break;
  }
  // enable menu elements
  algoMenu.disabled = false;
  shuffleBtn.disabled = false;
});
