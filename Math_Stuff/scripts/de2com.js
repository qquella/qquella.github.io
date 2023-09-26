
'use strict'

document.addEventListener("DOMContentLoaded", () => {
  const n1Input = document.getElementById("n1")
  const n2Input = document.getElementById("n2")
  const resultOutputB = document.getElementById("resultB")
  const c1Button = document.getElementById("convert1")
  const c2Button = document.getElementById("convert2")
  const resultOutputD = document.getElementById("resultD")
  const n1Bin = document.querySelector("#n1D")
  const n2Decimal = document.querySelector("#n2D")

  //result click 1
  c1Button.addEventListener("click", () => {
      const n1 = parseInt(n1Input.value)

      if (isNaN(n1)) {
          resultOutputB.textContent = "Invalid input"
      } else {
        //binary
          const r1 = twoComD2B(8, n1)
          resultOutputB.textContent = r1
      }
  })

  //result button 2
  c2Button.addEventListener("click", () => {
    const n2 = parseInt(n2Input.value)

    if (isNaN(n2)) {
        resultOutputD.textContent = "Invalid input"
    } else {
      //binary
        const r2 = twoComB2D(n2)
        resultOutputD.textContent = r2
    }
})

  // Function to update the decimal value for a binary input field
const updateDecimalValue = (binaryInput, decimalSpan) => {
  const inputValue = binaryInput.value;

  // Remove non-binary chars
  const binaryValue = inputValue.replace(/[^0-1-]/g, '')
  // Update input field
  binaryInput.value = binaryValue

  // Show decimal value in the corresponding span
  decimalSpan.textContent = parseInt(binaryValue, 2);
}

const updateBinaryValue = (decimalInput, binarySpan) => {
  const inputValue = decimalInput.value;

  // Remove non-binary chars
  const decimalValue = inputValue.replace(/[^0-9-]/g, '')
  // Update input field
  decimalInput.value = decimalValue

  // Show decimal value in the corresponding span
  binarySpan.textContent = (parseInt(decimalValue) || 0).toString(2)
};

// Event listener for the first binary input field
n1Input.addEventListener('input', () => {
  updateBinaryValue(n1Input, n1Bin)
})

// Event listener for the second binary input field
n2Input.addEventListener('input', () => {
  updateDecimalValue(n2Input, n2Decimal)
})


})

//adding two binary num
const addingBinary = (a, b, c = 0, sum ='') => {
  if(a === 0 && b === 0 && c === 0) return sum

  let s = (a%10) + (b%10) + c
  c = s >= 2 ? 1 : 0
  sum = (s%2) + sum

  return addingBinary(Math.floor(a/10), Math.floor(b/10), c, sum)
}

const twoComD2B = (numOfBits, dNum) => {

  if(dNum >= 0) return (dNum).toString(2).padStart(8, '0').match(/[0-9]{4}/g).join(' ')
  
  //take it's pos val and turns it into 8 bits binary
  const pBin = (-dNum).toString(2).padStart(8, '0') 

  //filp 0 & 1
  const fliped = flip(String(pBin))

  //add one in binary 
  const binRes = addingBinary(fliped, 1)

  //pad again
  return binRes.padStart(numOfBits, '0').match(/[0-9]{4}/g).join(' ')
}

const twoComB2D = (bNum) => {

  bNum = String(bNum).padStart(8, '0')

  if (bNum.charAt(0) === '0') {
    return parseInt(bNum, 2);
  } else {
    const binRes = addingBinary(flip(bNum), '1');
    return -parseInt(binRes, 2);
  }
}

const flip = (num, res = '') => {
  num = String(num)
  if(num.length === 0) return res

  if(num.slice(length-1) === '0') return flip(num.slice(0,length-1), '1' + res)
  else return flip(num.slice(0,length-1), '0' + res)
}
