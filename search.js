import { getWaitTime } from "./index.js";
import {
  wait,
  renderBars,
  highlightBars,
  addPermanentHighlight,
  clearPermanentHighlight,
  displayFound,
  displayNotFound,
} from "./utils.js";

//  helper functions for visualization
async function visualizeComparison(indices) {
  highlightBars(indices, "var(--compare-color)");
  await wait(getWaitTime());
  // await wait(1);
}

async function updateVisualization(arr) {
  renderBars(arr);
  await wait(getWaitTime());
  // await wait(1);
}

// linear search
async function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    await visualizeComparison([i]);
    if (arr[i] === target) {
      displayFound();
      addPermanentHighlight(i, "var(--found-color)");
      await updateVisualization(arr);
      clearPermanentHighlight();
      return;
    }
    await updateVisualization(arr);
  }
  displayNotFound();
}

// recursive binary search
async function binarySearch(arr, target, left, right) {
  if (left > right) {
    displayNotFound();
    return;
  }

  const mid = Math.floor((left + right) / 2);
  await visualizeComparison([mid]);

  if (arr[mid] === target) {
    displayFound();
    addPermanentHighlight(mid, "var(--found-color)");
    await updateVisualization(arr);
    clearPermanentHighlight();
    return;
  } else if (arr[mid] < target) {
    return binarySearch(arr, target, mid + 1, right);
  } else {
    return binarySearch(arr, target, left, mid - 1);
  }
}

export { linearSearch, binarySearch };
