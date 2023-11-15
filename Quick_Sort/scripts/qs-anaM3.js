'use strict';

// quick sort with median 3 method
function quickSortMedian3(arr) {
  const stack = [{ low: 0, high: arr.length - 1 }];

  while (stack.length) {
    const { low, high } = stack.pop();
    if (low < high) {
      const pivotIndex = partitionMedian3(arr, low, high);
      stack.push({ low, high: pivotIndex - 1 });
      stack.push({ low: pivotIndex + 1, high });
    }
  }
}

// partition function with median 3 method
function partitionMedian3(arr, lowIndex, highIndex) {
  const midIndex = Math.floor((lowIndex + highIndex) / 2);

  // Sort low, mid, and high to determine the median
  if (arr[lowIndex] > arr[midIndex]) {
    swap(arr, lowIndex, midIndex);
  }
  if (arr[midIndex] > arr[highIndex]) {
    swap(arr, midIndex, highIndex);
  }
  if (arr[lowIndex] > arr[midIndex]) {
    swap(arr, lowIndex, midIndex);
  }

  // Move the pivot to highIndex - 1 and return its index
  swap(arr, midIndex, highIndex - 1);
  return highIndex - 1;
}

// helper method to SWAP elements
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Calculation toolbox
function generateRandomArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.random());
  }
  return arr;
}

function measureExecutionTime(func, arr) {
  const start = performance.now();
  func(arr);
  const end = performance.now();
  return end - start;
}

function generateAscendingArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(i);
  }
  return arr;
}

function generateDescendingArray(size) {
  const arr = [];
  for (let i = size - 1; i >= 0; i--) {
    arr.push(i);
  }
  return arr;
}

const arraySizes = [10, 100, 1000, 5000, 10000, 100000, 1000000];
const iterations = 100;
let currentIteration = 0;

// Additional execution times for 'median 3' method
let executionTimesMedian3 = {
  ascending: [],
  random: [],
  descending: [],
};

// Additional chart for 'median 3' method
const ctxMedian3 = document.getElementById('myChartMedian3').getContext('2d');
let myChartMedian3;

const tableContainerMedian3 = document.getElementById('table-container-median3');
const dataTableMedian3 = document.createElement('table');
dataTableMedian3.className = 'data-table';
const tableHeaderMedian3 = document.createElement('thead');
tableHeaderMedian3.innerHTML =
  '<tr><th>Array Size</th><th>Ascending Order</th><th>Random Order</th><th>Descending Order</th></tr>';
const dataTableBodyMedian3 = document.createElement('tbody');

dataTableMedian3.appendChild(tableHeaderMedian3);
dataTableMedian3.appendChild(dataTableBodyMedian3);
tableContainerMedian3.appendChild(dataTableMedian3);

// Update the table with average data for 'median 3' method
function updateTableMedian3() {
  dataTableBodyMedian3.innerHTML = ''; // Clear existing rows
  arraySizes.forEach((size, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${size}</td>
                     <td>${(executionTimesMedian3.ascending[index] / iterations).toFixed(4)} ms</td>
                     <td>${(executionTimesMedian3.random[index] / iterations).toFixed(4)} ms</td>
                     <td>${(executionTimesMedian3.descending[index] / iterations).toFixed(4)} ms</td>`;
    dataTableBodyMedian3.appendChild(row);
  });
}

// Update chart and table as data generates for 'median 3' method
function animateChartMedian3() {
  if (currentIteration < iterations) {
    updateChartDataMedian3();
    updateTableMedian3();
    myChartMedian3.update();
    currentIteration++;
    requestAnimationFrame(animateChartMedian3);
  }
}

function updateChartDataMedian3() {
  arraySizes.forEach((size, index) => {
    const ascendingTime = measureExecutionTime(quickSortMedian3, generateAscendingArray(size));
    const randomTime = measureExecutionTime(quickSortMedian3, generateRandomArray(size));
    const descendingTime = measureExecutionTime(quickSortMedian3, generateDescendingArray(size));

    executionTimesMedian3.ascending[index] =
      (executionTimesMedian3.ascending[index] || 0) + ascendingTime;
    executionTimesMedian3.random[index] = (executionTimesMedian3.random[index] || 0) + randomTime;
    executionTimesMedian3.descending[index] =
      (executionTimesMedian3.descending[index] || 0) + descendingTime;
  });

  myChartMedian3.data.labels = arraySizes.map((size) => size.toString());
  myChartMedian3.data.datasets[0].data = executionTimesMedian3.ascending.map(
    (time) => time / iterations
  );
  myChartMedian3.data.datasets[1].data = executionTimesMedian3.random.map((time) => time / iterations);
  myChartMedian3.data.datasets[2].data = executionTimesMedian3.descending.map(
    (time) => time / iterations
  );
}

Chart.defaults.font.size = 18;

// Additional chart for 'median 3' method
myChartMedian3 = new Chart(ctxMedian3, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Ascending Order',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Random Order',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Descending Order',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
    tension: 0.4,
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Size of array',
          fontSize: 16, // Adjust the font size as needed
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time (ms)',
          fontSize: 16, // Adjust the font size as needed
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            return context.dataset.label + ': ' + context.formattedValue + ' ms';
          },
        },
      },
    },
  },
});

// Click event listener for the button for 'median 3' method
document.querySelector('#startAnalysisMedian3').addEventListener('click', () => {
  animateChartMedian3();
});