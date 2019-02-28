document.addEventListener("DOMContentLoaded", function() {
  fetchBooks()
});

function bookUrl(){
  return url = 'http://localhost:3000/books'
}

function userUrl(){
  return url = `http://localhost:3000/users`
}

function indBook(book){
  return url = `http://localhost:3000/books/${book}`
}

function fetchBooks(){
  fetch(bookUrl())
  .then(res => res.json())
  .then(json => renderBooks(json))
}

function renderBooks(json){
  let lisPanelDiv = document.getElementById(`list-panel`)
  json.forEach(book=>renderBook(book))
}

function renderBook(book){
  let listUl = document.getElementById(`list`)
  let bookLi = document.createElement(`li`)
  bookLi.id = `book-${book.id}`
  bookLi.innerText = book.title
  bookLi.addEventListener(`click`, ()=>{showBook(book)})
  listUl.appendChild(bookLi)
}

function showBook(book){
  let showPanelDiv = document.getElementById(`show-panel`)
  showPanelDiv.innerText = ``
  let bookTitle = document.createElement(`h2`)
  bookTitle.innerText = book.title
  let bookThumb = document.createElement(`IMG`)
  bookThumb.src = `${book.img_url}`
  let bookDesc = document.createElement(`p`)
  bookDesc.innerText = book.description
  var bookLikers = document.createElement(`ul`)
  bookLikers.id = `book-likes`
  var readButton = document.createElement(`button`)
  readButton.id = `button-${book.id}`
  readButton.innerText = `Read Book`
  readButton.addEventListener(`click`,()=>{readBook(book)} )
  showPanelDiv.append(bookTitle, bookThumb, bookDesc, bookLikers, readButton)
  userRead(book)
}

function userRead(book){
  var bookLikers = document.getElementById(`book-likes`)
  bookLikers.innerText = ``
  var userArray = book.users
  userArray.forEach((user)=>createUser(user))
}

function createUser(user){
  var bookLikers = document.getElementById(`book-likes`)
  let userLi = document.createElement(`li`)
  userLi.id = `user-${user.id}`
  userLi.innerText = user.username
  console.log(user.username)
  bookLikers.appendChild(userLi)
}

function readBook(book){
  users = book.users
  users.forEach(user=>readerCheck(user))
  if (!users.find(readerCheck)){
  book.users.push({id:1, username:"pouros"})
  fetch(indBook(`${book.id}`),{
    method: `PATCH`,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(book),
  })
  .then(res=> res.json())
  .then(json=>userRead(json))
} else { alert("You have already read this book!")}
}

function readerCheck(user){
  return user.id === 1
}
