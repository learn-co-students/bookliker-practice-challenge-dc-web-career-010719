document.addEventListener("DOMContentLoaded", fetchBooks);

let myId = {"id":1, "username":"pouros"}

function getList() {
  return document.querySelector('#list')
}

function getShowDiv() {
  return document.querySelector('#show-panel')
}

function fetchBooks() {
  fetch(`http://localhost:3000/books`)
  .then(res=>res.json())
  .then(booksArray=>booksArray.forEach(renderBook))
}

function renderBook(book) {
  let li = document.createElement('li')
  li.innerText = book.title
  li.id = book.id
  li.dataset.thumb = book.img_url
  li.dataset.description = book.description
  let x = []
  book.users.forEach(user=>x.push(user))
  li.dataset.users = JSON.stringify(x)
  li.addEventListener('click', bookInfo)
  getList().appendChild(li)
}

function bookInfo(e) {
  e.preventDefault();
  document.querySelector('#show-panel').innerText = ""

  let img =  document.createElement('img')
  img.src = e.target.dataset.thumb
  getShowDiv().appendChild(img)

  let p =  document.createElement('p')
  p.innerText = e.target.dataset.description
  getShowDiv().appendChild(p)

  let q = document.createElement('p')
  q.innerHTML = "<br><br> Users who liked this book:"
  getShowDiv().appendChild(q)

  let ul = document.createElement('ul')
  JSON.parse(e.target.dataset.users).forEach(user=>{
    let li = document.createElement('li')
    li.innerText = user.username
    ul.appendChild(li)
  })
  getShowDiv().appendChild(ul)

  let button = document.createElement('button')
  button.dataset.users = e.target.dataset.users
  button.dataset.id = e.target.id
  button.innerHTML = "Read Book"
  button.addEventListener('click', handleReadClick)
  getShowDiv().appendChild(button)
}

function handleReadClick(e) {
  e.preventDefault()
  let bookId = e.target.dataset.id
  if (!e.target.dataset.users.includes(JSON.stringify(myId))) {
    newUserArray = JSON.parse(e.target.dataset.users)
    newUserArray.push(myId)
    //e.target.dataset.users = JSON.stringify(newUserArray)
    let user = myId
    let li = document.createElement('li')
    li.innerText = user.username
    document.querySelectorAll("ul")[1].appendChild(li)
    patchBook(bookId, newUserArray)
  } else {
    newUserArray = JSON.parse(e.target.dataset.users)
    newUserArray.pop()
    patchBook(bookId, newUserArray)
    for ( child of document.querySelectorAll("ul")[1].children) {
      if (child.innerText === "pouros") {
        child.remove()
      }
    }
  }
}

function patchBook(bookId, newUserArray) {
  let data = {users: newUserArray}
  fetch(`http://localhost:3000/books/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(data)
  })
  .then(resp => resp.json())
}
