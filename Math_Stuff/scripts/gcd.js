'use strict'

document.addEventListener("DOMContentLoaded", () => {
  const numCountInput = document.getElementById("numCount");
  const numberInputsContainer = document.getElementById("numberInputs");
  const findGCDButton = document.getElementById("findGCD");
  const gcdResult = document.getElementById("gcdResult");

  let inputFields = [];

  numCountInput.addEventListener("input", () => {
      const numCount = parseInt(numCountInput.value);

      if (!isNaN(numCount) && numCount >= 1) {
          inputFields = [];

          // Clear existing input fields
          numberInputsContainer.innerHTML = "";

          for (let i = 0; i < numCount; i++) {
              const input = document.createElement("input");
              input.type = "number";
              input.placeholder = `N ${i + 1}`;
              inputFields.push(input);
              numberInputsContainer.appendChild(input);
          }

          findGCDButton.style.display = "block";
          gcdResult.style.display = "none";
      } else {
          alert("Please enter a valid number of fields (minimum 2).");
      }
  });

  findGCDButton.addEventListener("click", () => {
      const numbers = inputFields.map(input => parseInt(input.value));
      const gcd = findGCD(numbers);

      if (!isNaN(gcd)) {
          gcdResult.textContent = `GCD: ${gcd}`;
          gcdResult.style.display = "block";
      } else {
          alert("Please enter valid numbers.");
      }
  });

  function findGCD(arr) {
      if (arr.length < 2) {
          return NaN;
      }

      const gcd = (a, b) => {
          if (b === 0) {
              return a;
          }
          return gcd(b, a % b);
      };

      let result = arr[0];
      for (let i = 1; i < arr.length; i++) {
          result = gcd(result, arr[i]);
      }

      return result;
  }
});
