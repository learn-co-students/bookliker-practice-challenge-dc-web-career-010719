class User {
  constructor(data) {
    this.id = data.id
    this.username = data.username
    User.all.push(this)
  }

  // Create users when book data is fetched
  static createUsers(book) {
    book.users.forEach(u => {
      if (!User.detectUser(User.all, u.id)) {
        new User(u)
      }
    })
    this.createCurrentUser()
  }

  static createCurrentUser() {
    if(!this.findUser(1)) {
      new User({id: 1, username: "pouros"})
    }
  }

  // Helpers
  static detectUser(set, id) {
    return !!set.find(user => user.id == id)
  }

  static findUser(id) {
    return User.all.find(user => user.id == id)
  }

}

User.all = []
