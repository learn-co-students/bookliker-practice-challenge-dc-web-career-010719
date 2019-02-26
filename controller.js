class Controller {
  static init() {
    Controller.loadBooks()
  }

  static loadBooks() {
    Book.all().then(books => {
      Controller.books = books
      Controller.listBooks()
      Controller.loadUsers()
    })
  }

  static loadUsers() {
    Controller.user = new User({id:1, username: "pouros"})
    Controller.users = User.all()
  }

  static listBooks() {
    const list = document.querySelector('#list')
    Controller.books.forEach(book => {
      const bookItem = book.listElement()
      list.appendChild(bookItem)
    })
  }

  static handleBookSelect(event, book) {
    Controller.displayBook(book)
  }

  static displayBook(book) {
    const container = document.querySelector('#show-panel')
    container.innerHTML = ''

    const bookElem = book.mainElement()
    container.appendChild(bookElem)
  }

  static readBook(book) {
    book.addUser(Controller.user)
    this.displayBook(book)
  }

  static unreadBook(book) {
    book.removeUser(Controller.user)
    this.displayBook(book)
  }
}

Controller.books = []
Controller.users = []
Controller.user