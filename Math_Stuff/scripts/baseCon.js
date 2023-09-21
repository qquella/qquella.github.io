
'use strict'

document.addEventListener("DOMContentLoaded", () => {
  const baseInput = document.getElementById("base")
  const decimalInput = document.getElementById("decimal")
  const resultOutput = document.getElementById("result")
  const convertButton = document.getElementById("convert")

  convertButton.addEventListener("click", () => {
      const base = parseInt(baseInput.value)
      const decimal = parseInt(decimalInput.value)

      if (isNaN(base) || isNaN(decimal)) {
          resultOutput.textContent = "Invalid input"
      } else {
          const convertedValue = decimal.toString(base).toUpperCase() //little cheat XD
          resultOutput.textContent = convertedValue
      }
  })
})
