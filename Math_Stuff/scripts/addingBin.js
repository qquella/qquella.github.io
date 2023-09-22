
'use strict'

document.addEventListener("DOMContentLoaded", () => {
  const n1Input = document.getElementById("n1")
  const n2Input = document.getElementById("n2")
  const resultOutput = document.getElementById("result")
  const addButton = document.getElementById("add")

  addButton.addEventListener("click", () => {
      const n1 = parseInt(n1Input.value)
      const n2 = parseInt(n2Input.value)

      if (isNaN(n1) || isNaN(n2)) {
          resultOutput.textContent = "Invalid input"
      } else {
          const sum = addingBinary(n1, n2).toUpperCase() //little cheat XD
          resultOutput.textContent = sum
      }
  })
})

const addingBinary = (a, b, c = 0, sum ='') => {
  if(a === 0 && b === 0 && c === 0) return sum

  let s = (a%10) + (b%10) + c
  c = s >= 2 ? 1 : 0
  sum = (s%2) + sum

  return addingBinary(Math.floor(a/10), Math.floor(b/10), c, sum)
}
