class Adapter {
  // Get all books
  static getBooks() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(bookData => basePage(bookData))
  }

  static updateUsers(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({users: book.users})
    }).then(res => res.json())
  }
}
