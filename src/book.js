function createBook() {
  const allBooks = []

  return class {
    constructor(data) {
      this.id = data.id
      this.title = data.title
      this.description = data.description
      this.img_url = data.img_url
      this.users = data.users
      allBooks.push(this)
    }

    // Display list when page is rendered
    static createBooks(data) {
      for (const key in data) {
        User.createUsers(new Book(data[key]))
      }
    }

    static listAll() {
      this.all().forEach(book => book.displayInList())
    }

    displayInList() {
      let p = document.createElement('p')
      let button = document.createElement('button')

      button.textContent = this.title
      button.className = "book-button"
      button.id = `button-${this.id}`

      p.appendChild(button)
      bookList().appendChild(p)
    }

    // Display show card when title is clicked
    displayInShow() {
      let card = document.createElement('div')
      card.className = "display-card"

      let span = document.createElement('span')

      let h2 = document.createElement('h2')
      h2.textContent = this.title

      let image = document.createElement('img')
      image.src = this.img_url

      let p = document.createElement('p')
      p.textContent = this.description

      let users = document.createElement('p')
      users.className = "users-span"
      users.id = `users-book-${this.id}`

      this.listUsers(users)

      let buttonRow = document.createElement('p')
      let button = document.createElement('button')
      button.id = `read-${this.id}`
      this.setButtonText(button)
      buttonRow.appendChild(button)

      card.appendChild(h2)
      span.appendChild(image)
      span.appendChild(p)
      span.appendChild(users)
      span.appendChild(buttonRow)
      card.appendChild(span)
      bookShow().appendChild(card)
    }

    listUsers(usersSpan) {
      let s = document.createElement('span')
      s.className = "user-span"
      s.textContent = "Read by:"
      usersSpan.appendChild(s)

      this.users.forEach(function(user) {
        let span = document.createElement('span')
        span.className = "user-span"
        span.textContent = `${user.username}  `
        usersSpan.appendChild(span)
      })
    }

    // Change whether current user has read book
    addToUsers(userID) {
      this.users.push(User.findUser(userID))
      clear(usersSpan(this.id))
      this.listUsers(usersSpan(this.id))
      this.setButtonText(readButton(this.id))
    }

    removeFromUsers(userID) {
      this.users = this.users.filter(u => u.id != userID)
      clear(usersSpan(this.id))
      this.listUsers(usersSpan(this.id))
      this.setButtonText(readButton(this.id))
    }

    setButtonText(button) {
      if (User.detectUser(this.users, 1)) {
        button.textContent = "Mark as Unread"
      } else {
        button.textContent = "Mark as Read"
      }
    }

    // Helpers
    static all() {
      return allBooks
    }

    static findBook(id) {
      return Book.all().find(book => book.id == id)
    }

  }
}

const Book = createBook()
