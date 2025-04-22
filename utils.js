// generate random numbers within range the range min to max
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate an array of random numbers of given size
function generateRandomArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    let num = generateRandomNumber(10, 100);
    arr.push(num);
  }
  return arr;
}

// render bars with their corresponding heights and values
function renderBars(arr) {
  const container = document.getElementById("algo-container");
  container.innerHTML = ""; // clear previous boxes
  arr.forEach((num, idx) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${num * 3}px`; // scale height
    bar.textContent = num;
    container.appendChild(bar);
  });
}

// highlights bars at given indices, with a given color
function highlightBars(indices, color) {
  const bars = document.querySelectorAll(".bar");
  indices.forEach((idx) => {
    bars[idx].style.backgroundColor = color;
  });
}

// function to wait for a given time t, in seconds
function wait(secs) {
  return new Promise((resolve) => setTimeout(resolve, secs * 1000));
}

export { generateRandomArray, renderBars, highlightBars, wait };
