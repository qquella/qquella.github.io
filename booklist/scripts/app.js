const list = document.querySelector('#book-list ul');

// delete books
list.addEventListener('click', (e) => {
  if(e.target.className == 'delete'){
    const li = e.target.parentElement;
    li.parentNode.removeChild(li);
  }
});

//add books
const forms = document.forms;
// console.log(forms);
// console.log(forms['add-book']);

// Array.from(forms).forEach(function(form){
//   console.log(form);
// });

//adding elements (books)
const addForm = forms['add-book'];
addForm.addEventListener('submit', e => {
  //prevent default (refresh when click)
  e.preventDefault();
  const value = addForm.querySelector('input[type="text"]').value;

  //create elements
  const li = document.createElement('li')
  const bookName = document.createElement('span')
  const deleteBtn = document.createElement('span') 

  //add text content
  bookName.textContent = value
  deleteBtn.textContent = 'delete'

  //add classes
  bookName.classList.add('name')
  deleteBtn.classList.add('delete')

  //append child
  li.appendChild(bookName)
  li.appendChild(deleteBtn)
  list.appendChild(li)
});
  