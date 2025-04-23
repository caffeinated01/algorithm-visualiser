import { waitTime } from "./index.js";
import { wait, renderBars, highlightBars } from "./utils.js";

async function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      highlightBars([j, j + 1], "var(--compare-color)");
      await wait(waitTime);
      if (arr[j] > arr[j + 1]) {
        highlightBars([j, j + 1], "var(--swap-color)");
        await wait(waitTime);
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      renderBars(arr);
      await wait(waitTime);
    }
  }
}

async function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}

export { bubbleSort, insertionSort };
