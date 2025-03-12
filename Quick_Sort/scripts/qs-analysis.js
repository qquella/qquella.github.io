
'use strict'

// quick sort
// function quickSort(arr, lowIndex = 0, highIndex = arr.length - 1) {
//   // base case
//   if (lowIndex < highIndex) {
//     // find pivot index
//     let pivotIndex = partition(arr, lowIndex, highIndex);

//     // recursively sort the sub-arrays
//     quickSort(arr, lowIndex, pivotIndex - 1); // left
//     quickSort(arr, pivotIndex + 1, highIndex); // right
//   }
// }

//using this alternative to increse stack lol
function quickSort(arr) {
  const stack = [{ low: 0, high: arr.length - 1 }];

  while (stack.length) {
    const { low, high } = stack.pop();
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      stack.push({ low, high: pivotIndex - 1 });
      stack.push({ low: pivotIndex + 1, high });
    }
  }
}

// partition function
function partition(arr, lowIndex, highIndex) {
  const pivotIndex = Math.floor(Math.random() * (highIndex - lowIndex + 1)) + lowIndex;
  // Swap the pivot element to the end of the array
  swap(arr, pivotIndex, highIndex);

  let pivot = arr[highIndex];
  let i = lowIndex - 1;

  for (let j = lowIndex; j < highIndex; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr, i, j);
    }
  }

  swap(arr, i + 1, highIndex);
  return i + 1;
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
let executionTimes = {
  ascending: [],
  random: [],
  descending: [],
};
const ctx = document.getElementById('myChart').getContext('2d');
let myChart;

const tableContainer = document.getElementById('table-container');
const dataTable = document.createElement('table');
dataTable.className = 'data-table';
const tableHeader = document.createElement('thead');
tableHeader.innerHTML = '<tr><th>Array Size</th><th>Ascending Order</th><th>Random Order</th><th>Descending Order</th></tr>';
const dataTableBody = document.createElement('tbody');

dataTable.appendChild(tableHeader);
dataTable.appendChild(dataTableBody);
tableContainer.appendChild(dataTable);

// Update the table with average data
function updateTable() {
  dataTableBody.innerHTML = ''; // Clear existing rows
  arraySizes.forEach((size, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${size}</td>
                     <td>${(executionTimes.ascending[index] / iterations).toFixed(4)} ms</td>
                     <td>${(executionTimes.random[index] / iterations).toFixed(4)} ms</td>
                     <td>${(executionTimes.descending[index] / iterations).toFixed(4)} ms</td>`;
    dataTableBody.appendChild(row);
  });
}

// Update chart and table as data generates
function animateChart() {
  if (currentIteration < iterations) {
    updateChartData();
    updateTable();
    myChart.update();
    currentIteration++;
    requestAnimationFrame(animateChart);
  }
}

function updateChartData() {
  arraySizes.forEach((size, index) => {
    const ascendingTime = measureExecutionTime(quickSort, generateAscendingArray(size));
    const randomTime = measureExecutionTime(quickSort, generateRandomArray(size));
    const descendingTime = measureExecutionTime(quickSort, generateDescendingArray(size));

    executionTimes.ascending[index] = (executionTimes.ascending[index] || 0) + ascendingTime;
    executionTimes.random[index] = (executionTimes.random[index] || 0) + randomTime;
    executionTimes.descending[index] = (executionTimes.descending[index] || 0) + descendingTime;
  });

  myChart.data.labels = arraySizes.map(size => size.toString());
  myChart.data.datasets[0].data = executionTimes.ascending.map(time => time / iterations);
  myChart.data.datasets[1].data = executionTimes.random.map(time => time / iterations);
  myChart.data.datasets[2].data = executionTimes.descending.map(time => time / iterations);
}

Chart.defaults.font.size = 18;
myChart = new Chart(ctx, {
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

// Click event listener for the button
document.querySelector('#startAnalysis').addEventListener('click', () => {
  animateChart();
});