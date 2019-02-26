class Book {
  constructor({id, title, description, img_url, users}) {
    this.id = id
    this.title = title
    this.description = description
    this.img_url = img_url

    this.users = users.map(u => new User(u))
    this.users.forEach(u => u.books.push(this))
    Book.store.push(this)
  }

  /* api */
  
  static async all() {
    const res = await fetch(Book.api);
    const books = await res.json();
    return books.map(b => new Book(b));
  }

  static async find(id) {
    const res = await fetch(`${Book.api}/${id}`);
    const book = await res.json();
    return new Book(book);
  }

  attributes() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      img_url: this.img_url,
      users: this.users.map(u => u.attributes())
    }
  }

  update() {
    const opts = {
      method: 'PATCH',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(this.attributes())
    }

    fetch(`${Book.api}/${this.id}`, opts);
  }

  delete() {
    fetch(`${Book.api}/${this.id}`, { method: 'DELETE' });
  }

  /* associations */

  findUser(user) {
    return this.users.find(u => u.id === user.id)
  }

  addUser(user) {
    if (!this.findUser(user)) {
      user.addBook(this)
      this.users.push(user)
      this.update()
    }
  }

  removeUser(user) {
    if (this.findUser(user)) {
      user.removeBook(this)
      this.users = this.users.filter(u => u.id !== user.id)
      this.update()
    }
  }

  /* view */

  listElement() {
    const item = document.createElement('a')
    item.href = '#'
    item.innerText = this.title
    item.dataset.id = this.id

    item.addEventListener('click', e => {
      Controller.handleBookSelect(e, this)
    })

    const li = document.createElement('li')
    li.appendChild(item)
    return li
  }

  mainElement() {
    const main = document.createElement('div')
    main.dataset.id = this.id

    main.innerHTML += `<h2>${this.title}</h2>`
    main.innerHTML += `<img src="${this.img_url}" alt="${this.title}" />`
    main.innerHTML += `<p>${this.description}</p>`

    main.innerHTML += '<ul>'
    this.users.forEach(u => {
      main.innerHTML += `<li>${u.username}</li>`
    })
    main.innerHTML += '</ul><br/>'

    const likeBtn = document.createElement('button')

    if (Controller.user.findBook(this)) {
      likeBtn.innerText = "Unread Book"  
      likeBtn.addEventListener('click', e => {
        Controller.unreadBook(this)
      })
    } else {
      likeBtn.innerText = "Read Book"  
      likeBtn.addEventListener('click', e => {
        Controller.readBook(this)
      })
    }

    main.appendChild(likeBtn)
    return main
  }
}

Book.store = []
Book.api = 'http://localhost:3000/books'