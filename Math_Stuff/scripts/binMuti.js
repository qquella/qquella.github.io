
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
          const product = binaryMuti(n1, n2).toUpperCase() //little cheat XD
          resultOutput.textContent = product
      }
  })
})

n2.addEventListener('input', (e) => {
  const inputValue = e.target.value

  // Remove non-binary chars
  const binaryValue = inputValue.replace(/[^01]/g, '')
  // Update input field 
  e.target.value = binaryValue
})

//adding two binary num
const addingBinary = (a, b, c = 0, sum ='') => {
  if(a === 0 && b === 0 && c === 0) return sum

  let s = (a%10) + (b%10) + c
  c = s >= 2 ? 1 : 0
  sum = (s%2) + sum

  return addingBinary(Math.floor(a/10), Math.floor(b/10), c, sum)
}

//mutipulying two binary num
const binaryMuti = (a, b) => {

  let l = []
  let bLen = b.toString().length
  let bArr = Array.from(String(b), Number)

  for(let i=0; i<bLen; i++){
     //l[i] = Array.from(bArr[bLen - (i+1)] * a , Number)
     l[i] = String(bArr[bLen - (i+1)] * a)
     for(let p=i; p>0; p--){
      l[i] += ('0')
     }
  }

  let sum = l[0]
  for(let r=1; r<l.length; r++){
    sum = addingBinary(sum, l[r])
  }

  return sum

}

