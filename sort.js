import { getWaitTime } from "./index.js";
import {
  wait,
  renderBars,
  highlightBars,
  highlightAll,
  addPermanentHighlight,
  clearPermanentHighlight,
} from "./utils.js";

//  helper functions for visualization
async function visualizeComparison(indices) {
  highlightBars(indices, "var(--compare-color)");
  await wait(getWaitTime());
}

async function visualizeSwap(indices) {
  highlightBars(indices, "var(--swap-color)");
  await wait(getWaitTime());
}

async function updateVisualization(arr) {
  renderBars(arr);
  await wait(getWaitTime());
}

function swap(arr, x, y) {
  [arr[x], arr[y]] = [arr[y], arr[x]];
}

// bubble sort
async function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      await visualizeComparison([j, j + 1]);

      if (arr[j] > arr[j + 1]) {
        await visualizeSwap([j, j + 1]);

        swap(arr, j, j + 1);
      }

      await updateVisualization(arr);
    }
  }
  highlightAll("var(--sorted-color)");
}

// insertion sort
async function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    await visualizeComparison([i, j]);

    while (j >= 0 && key < arr[j]) {
      await visualizeSwap([i, j]);

      arr[j + 1] = arr[j];
      j = j - 1;

      await updateVisualization(arr);
    }

    arr[j + 1] = key;
    await updateVisualization(arr);
  }

  highlightAll("var(--sorted-color)");
}
// quick sort
async function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = await partition(arr, left, right);

    await quickSort(arr, left, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, right);
  }
  // await updateVisualization(arr);
  highlightAll("var(--sorted-color)");
}

async function partition(arr, left, right) {
  const pivot = right--;
  addPermanentHighlight(pivot, "var(--pivot-color)");
  await updateVisualization(arr);

  while (left <= right) {
    while (arr[left] < arr[pivot]) {
      if (left != right) {
        await visualizeComparison([left, right]);
        await updateVisualization(arr);
      }

      left++;
    }
    while (arr[right] > arr[pivot]) {
      if (left != right) {
        await visualizeComparison([left, right]);
        await updateVisualization(arr);
      }

      right--;
    }
    if (left <= right) {
      await visualizeSwap([left, right]);
      swap(arr, left, right);
      await updateVisualization(arr);

      left++;
      right--;
    }
  }
  if (pivot != left) {
    await visualizeSwap([left, pivot]);
  }
  swap(arr, left, pivot);
  await updateVisualization(arr);
  clearPermanentHighlight();
  return left;
}

export { bubbleSort, insertionSort, quickSort };
