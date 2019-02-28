// Retrieve
function bookList() {
  return document.querySelector('#list')
}

function bookShow() {
  return document.querySelector('#show-panel')
}

function usersSpan(id) {
  return document.querySelector(`#users-book-${id}`)
}

function readButton(id) {
  return document.querySelector(`#read-${id}`)
}

// primary functions
function basePage(data) {
  Book.createBooks(data)
  Book.listAll()
}

// event listeners
function handleListClick(e) {
  if (e.target && e.target.nodeName === "BUTTON") {
    let bookID = e.target.id.slice(7)
    clear(bookShow())
    Book.findBook(bookID).displayInShow()
  }
}

function handleReadClick(e) {
  if (e.target && e.target.nodeName === "BUTTON") {
    let bookID = e.target.id.slice(5)
    if (e.target.innerText == "Mark as Read") {
      Book.findBook(bookID).addToUsers(1)
      Adapter.updateUsers(Book.findBook(bookID))
    } else {
      Book.findBook(bookID).removeFromUsers(1)
      Adapter.updateUsers(Book.findBook(bookID))
    }
  }
}

// helpers
function clear(area) {
  while (area.firstChild) {
    area.removeChild(area.firstChild)
  }
}
