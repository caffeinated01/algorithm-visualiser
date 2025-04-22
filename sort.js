import { waitTime, highlightWaitTime } from "./index.js";
import { wait, renderBars, highlightBars } from "./utils.js";

async function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      highlightBars([j, j + 1], "var(--compare-color)");
      await wait(highlightWaitTime);
      if (arr[j] > arr[j + 1]) {
        highlightBars([j, j + 1], "var(--swap-color)");
        await wait(highlightWaitTime);
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      renderBars(arr);
      await wait(waitTime);
    }
  }
}

export { bubbleSort };
