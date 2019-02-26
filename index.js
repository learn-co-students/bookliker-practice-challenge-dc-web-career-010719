let user = {id: 1, username: 'pouros'}

document.addEventListener("DOMContentLoaded", init);

function init() {
  renderBookList()
}

function renderBookList() {
  bookListArea = document.getElementById('list').innerHTML = ''
  fetch(`http://localhost:3000/books`)
  .then(resp => resp.json())
  .then(json => json.forEach(renderBook))
}

function renderBook(book) {
  let bookListArea = document.getElementById('list')

  let li = document.createElement('li')
  bookListArea.appendChild(li)
  li.innerText = book.title

  li.addEventListener('click', () => {displayBookInfo(book)})
}

function displayBookInfo(book) {
  let bookDisplayArea = document.getElementById('show-panel')
  bookDisplayArea.innerHTML = ''

  let thumbnail = document.createElement('img')
  bookDisplayArea.appendChild(thumbnail)
  thumbnail.src = book.img_url

  let blurb = document.createElement('p')
  bookDisplayArea.appendChild(blurb)
  blurb.innerText = book.description

  let users = document.createElement('div')
  bookDisplayArea.appendChild(users)
  for (const i of book.users) {
    let userEl = document.createElement('h4')
    users.appendChild(userEl)
    userEl.innerText = i.username
  }

  let readBtn = document.createElement('button')
  bookDisplayArea.appendChild(readBtn)
  readBtn.innerText = 'Read Book'
  readBtn.addEventListener('click', () => readBook(book))
}

function readBook(book) {
  let users = book.users.map(i => i.id)
  // debugger
  if (users.includes(user.id)) {
    alert('You have already read this book!')
  } else {
    book.users.push(user)
    // debugger
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({users: book.users})
    })
    displayBookInfo(book)
  }
}











//
