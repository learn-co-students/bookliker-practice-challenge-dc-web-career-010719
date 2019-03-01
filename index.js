document.addEventListener("DOMContentLoaded",function (){
fetchBooks()
})
let currentUser = { id: 1, username: 'pouros' }

function fetchBooks() {
fetch('http://localhost:3000/books')
.then(resp => resp.json())
.then(bookData => bookData.forEach(book => renderBook(book)))
}


function renderBook(book) {
  // console.log(book);
  let bookLi = document.createElement('li')
  let bookTitle = document.createElement('p')
  // let bookDesc = document.createElement('p')
  // let bookImage = document.createElement('img')
  bookLi.dataset.id = book.id
  bookTitle.innerHTML = book.title
  // bookDesc.innerHTML = book.description
  // bookImage.scr = book.image_url
  bookLi.appendChild(bookTitle)
  document.querySelector('#list').appendChild(bookLi)
  bookLi.addEventListener('click', function(){
    showBookInfo(book)
  })
}

function showBookInfo(book) {
  let showPanel = document.querySelector('#show-panel')
  while (showPanel.firstChild) {
    showPanel.removeChild(showPanel.firstChild);
  }
  let bookDesc = document.createElement('p')
  let bookImage = document.createElement('img')
  let likeBttn = document.createElement('button')
  likeBttn.innerHTML = 'Like'
  likeBttn.addEventListener('click', function(){
    likeBook(book)
  })
  bookDesc.innerHTML = book.description
  bookImage.src = book['img_url']
  showPanel.append(bookDesc, bookImage, likeBttn)
  book.users.forEach(user => renderUsers(user, showPanel))
}


function renderUsers(user, showPanel){
  debugger
  let userList = document.createElement('ul')
  userList.innerHTML = `<li>${user.username}</li>`
  showPanel.appendChild(userList)
}

function likeBook(book) {
  let liked = book.users
    .map(user => user.username)
    .includes(currentUser.username);

  if (liked) {
    window.alert("You've read this book already, go away!");
  } else {
    book.users.push(currentUser);

    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ users: book.users })
    })
      .then(res => res.json())
      .then(book => showBookInfo(book));
  }
}
