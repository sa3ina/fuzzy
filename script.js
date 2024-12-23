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
  displayChart("Union", result);
}

function calculateIntersection() {
  const B = getFuzzySet("setB");
  const C = getFuzzySet("setC");
  const result = {};
  U.forEach((x) => {
    result[x] = Math.min(B[x], C[x]);
  });
  displayResult("Intersection", result);
  displayChart("Intersection", result);
}

function calculateComplement() {
  const A = getFuzzySet("setB");
  const result = {};
  U.forEach((x) => {
    result[x] = 1 - (A[x] || 0);
  });
  displayResult("Complement", result);
  displayChart("Complement", result);
}

function displayResult(operation, result) {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = `<h3>${operation} Result:</h3>`;

  let expression = `${operation} = {`;

  for (const [key, value] of Object.entries(result)) {
    expression += `${value.toFixed(2)}|${key}, `;
  }

  expression = expression.slice(0, -2);
  expression += "}";

  const p = document.createElement("p");
  p.textContent = expression;
  resultContainer.appendChild(p);
}

function displayChart(operation, result) {
  const resultContainer = document.getElementById("chartresult");
  resultContainer.innerHTML = `<canvas id="chartCanvas"></canvas>`;

  const ctx = document.getElementById("chartCanvas").getContext("2d");

  const labels = Object.keys(result).map(Number);
  const data = Object.values(result);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `${operation} Result`,
          data: data,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Elements (x)",
          },
        },
        y: {
          min: 0,
          max: 1,
          title: {
            display: true,
            text: "Membership Degree (μ)",
          },
        },
      },
    },
  });
}

initializeInputs();
