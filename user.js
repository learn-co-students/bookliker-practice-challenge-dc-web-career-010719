class User {
  constructor({id, username}) {
    this.id = id
    this.username = username
    this.books = []
    User.addUser(this)
  }

  static addUser(user) {
    if (!User.find(user.id))
      User.store.push(user)
  }

  static all() {
    return User.store
  }

  static find(id) {
    return User.all().find(u => u.id === id)
  }

  attributes() {
    return {
      id: this.id,
      username: this.username
    }
  }

  findBook(book) {
    return this.books.find(b => b.id === book.id)
  }

  addBook(book) {
    if (!this.findBook(book)) {
      this.books.push(book)
    }
  }

  removeBook(book) {
    this.books = this.books.filter(b => b.id !== book.id)
  }
}

User.store = []