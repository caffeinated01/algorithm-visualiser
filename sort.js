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
async function visualiseComparison(indices) {
  highlightBars(indices, "var(--compare-color)");
  await wait(getWaitTime());
}

async function visualiseSwap(indices) {
  highlightBars(indices, "var(--swap-color)");
  await wait(getWaitTime());
}

async function updateVisualisation(arr) {
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
      await visualiseComparison([j, j + 1]);

      if (arr[j] > arr[j + 1]) {
        await visualiseSwap([j, j + 1]);

        swap(arr, j, j + 1);
      }

      await updateVisualisation(arr);
    }
  }
  highlightAll("var(--sorted-color)");
}

// insertion sort
async function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    await visualiseComparison([i, j]);

    while (j >= 0 && key < arr[j]) {
      await visualiseSwap([i, j]);

      arr[j + 1] = arr[j];
      j = j - 1;

      await updateVisualisation(arr);
    }

    arr[j + 1] = key;
    await updateVisualisation(arr);
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
  // await updateVisualisation(arr);
  highlightAll("var(--sorted-color)");
}

async function partition(arr, left, right) {
  const pivot = right--;
  addPermanentHighlight(pivot, "var(--pivot-color)");
  await updateVisualisation(arr);

  while (left <= right) {
    while (arr[left] < arr[pivot]) {
      if (left != right) {
        await visualiseComparison([left, right]);
        await updateVisualisation(arr);
      }

      left++;
    }
    while (arr[right] > arr[pivot]) {
      if (left != right) {
        await visualiseComparison([left, right]);
        await updateVisualisation(arr);
      }

      right--;
    }
    if (left <= right) {
      await visualiseSwap([left, right]);
      swap(arr, left, right);
      await updateVisualisation(arr);

      left++;
      right--;
    }
  }
  if (pivot != left) {
    await visualiseSwap([left, pivot]);
  }
  swap(arr, left, pivot);
  await updateVisualisation(arr);
  clearPermanentHighlight();
  return left;
}

export { bubbleSort, insertionSort, quickSort };
