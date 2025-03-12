
'use strict'

document.addEventListener("DOMContentLoaded", () => {
  const n1Input = document.getElementById("n1")
  const n2Input = document.getElementById("n2")
  const resultOutputB = document.getElementById("resultB")
  const addButton = document.getElementById("add")
  const resultOutputD = document.getElementById("resultD")
  const n1Decimal = document.querySelector("#n1D")
  const n2Decimal = document.querySelector("#n2D")

  //result click
  addButton.addEventListener("click", () => {
      const n1 = parseInt(n1Input.value)
      const n2 = parseInt(n2Input.value)

      if (isNaN(n1) || isNaN(n2)) {
          resultOutputB.textContent = "Invalid input"
      } else {
        //binary
          const sumB = addingBinary(n1, n2).toUpperCase() //little cheat XD
          resultOutputB.textContent = sumB
        //decimal
          const sumD = parseInt(sumB, 2)
          resultOutputD.textContent = sumD
      }
  })

  // Function to update the decimal value for a binary input field
const updateDecimalValue = (binaryInput, decimalSpan) => {
  const inputValue = binaryInput.value;

  // Remove non-binary chars
  const binaryValue = inputValue.replace(/[^01]/g, '');
  // Update input field
  binaryInput.value = binaryValue

  // Show decimal value in the corresponding span
  decimalSpan.textContent = parseInt(binaryValue, 2);
};

// Event listener for the first binary input field
n1Input.addEventListener('input', () => {
  updateDecimalValue(n1Input, n1Decimal)
})

// Event listener for the second binary input field
n2Input.addEventListener('input', () => {
  updateDecimalValue(n2Input, n2Decimal)
})


})

// n2.addEventListener('input', (e) => {
//   const inputValue = e.target.value

//   // Remove non-binary chars
//   const binaryValue = inputValue.replace(/[^01]/g, '')
//   // Update input field 
//   e.target.value = binaryValue

//   //show decimal val of input
//   e.target.nextElementSibling.nextElementSibling.value = parseInt(binaryValue, 2)
// })

// n1.addEventListener('input', (e) => {
//   const inputValue = e.target.value

//   // Remove non-binary chars
//   const binaryValue = inputValue.replace(/[^01]/g, '')
//   // Update input field 
//   e.target.value = binaryValue
// })

const addingBinary = (a, b, c = 0, sum ='') => {
  if(a === 0 && b === 0 && c === 0) return sum

  let s = (a%10) + (b%10) + c
  c = s >= 2 ? 1 : 0
  sum = (s%2) + sum

  return addingBinary(Math.floor(a/10), Math.floor(b/10), c, sum)
}


