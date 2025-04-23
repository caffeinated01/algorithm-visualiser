import { getWaitTime } from "./index.js";
import { wait, renderBars, highlightBars, highlightAll } from "./utils.js";

async function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      highlightBars([j, j + 1], "var(--compare-color)");
      await wait(getWaitTime());
      if (arr[j] > arr[j + 1]) {
        highlightBars([j, j + 1], "var(--swap-color)");
        await wait(getWaitTime());
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      renderBars(arr);
      await wait(getWaitTime());
    }
  }
  highlightAll("var(--sorted-color)");
}

async function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    highlightBars([i, j], "var(--compare-color)");
    await wait(getWaitTime());

    while (j >= 0 && key < arr[j]) {
      highlightBars([i, j], "var(--swap-color)");
      await wait(getWaitTime());

      arr[j + 1] = arr[j];
      j = j - 1;

      renderBars(arr);
      await wait(getWaitTime());
    }
    arr[j + 1] = key;
    renderBars(arr);
    await wait(getWaitTime());
  }
  highlightAll("var(--sorted-color)");
}

export { bubbleSort, insertionSort };
