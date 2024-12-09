const U = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function initializeInputs() {
  const setBContainer = document.getElementById("setBInputs");
  const setCContainer = document.getElementById("setCInputs");

  U.forEach((x) => {
    const setBInput = document.createElement("div");
    setBInput.innerHTML = `
      <label>Element ${x}:</label>
      <input type="number" id="setB-${x}" min="0" max="1" step="0.1" value="0">
    `;
    setBContainer.appendChild(setBInput);

    const setCInput = document.createElement("div");
    setCInput.innerHTML = `
      <label>Element ${x}:</label>
      <input type="number" id="setC-${x}" min="0" max="1" step="0.1" value="0">
    `;
    setCContainer.appendChild(setCInput);
  });
}

function getFuzzySet(prefix) {
  const fuzzySet = {};
  U.forEach((x) => {
    const value =
      parseFloat(document.getElementById(`${prefix}-${x}`).value) || 0;
    fuzzySet[x] = value;
  });
  return fuzzySet;
}

function calculateUnion() {
  const B = getFuzzySet("setB");
  const C = getFuzzySet("setC");
  const result = {};
  U.forEach((x) => {
    result[x] = Math.max(B[x], C[x]);
  });
  displayResult("Union", result);
}

function calculateIntersection() {
  const B = getFuzzySet("setB");
  const C = getFuzzySet("setC");
  const result = {};
  U.forEach((x) => {
    result[x] = Math.min(B[x], C[x]);
  });
  displayResult("Intersection", result);
}

function displayResult(operation, result) {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = `<h3>${operation} Result:</h3>`;
  for (const [key, value] of Object.entries(result)) {
    const p = document.createElement("p");
    p.textContent = `x = ${key}, μ = ${value.toFixed(2)}`;
    resultContainer.appendChild(p);
  }
}

initializeInputs();
