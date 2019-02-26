class Book{
  constructor(data, adapter) {
      this.id = data.id
      this.title = data.title
      this.description = data.description
      this.img_url = data.img_url
      this.users = data.users
      this.adapter = adapter
  }
  render(){
    let bookList = document.getElementById('list')

    let li = document.createElement('li')
    li.id = `li-book-${this.id}`
    li.innerText = `${this.title}`

    li.addEventListener('click', ()=>{this.eventForShowBook()})

    bookList.appendChild(li)
  }

  eventForShowBook(){
    let showPage = this.getShowPanel()
    showPage.innerText = ""

    let h1 = document.createElement('h1')
    h1.innerText = this.title

    let img = document.createElement('img')
    img.src = this.img_url

    let p = document.createElement('p')
    p.innerText = this.description

    let h4 = document.createElement('h4')
    h4.innerText= `The users that have read the book are: `

    let ul = document.createElement('ul')
    ul.id = `book-${this.id}-users-list`

    this.users.forEach((user)=> {
      let li = document.createElement('li')
      li.innerText = `${user.username}`
      ul.appendChild(li)
    })

    let btn = document.createElement('button')
    btn.innerText = "Read"
    btn.addEventListener('click', ()=>{this.eventForReadABook()})

    showPage.appendChild(h1)
    showPage.appendChild(img)
    showPage.appendChild(p)
    showPage.appendChild(h4)
    showPage.appendChild(ul)
    showPage.appendChild(btn)
  }

  getShowPanel(){
    return document.getElementById('show-panel')
  }

  eventForReadABook(){
    this.readBook(currentUser, this)
  }

  readBook(userOBJ, bookOBJ){
    //if user is already in book.users

    let found = bookOBJ.users.find(function(user) {
                  return user.id === userOBJ.id;
             });

    if(!!found){
       // alert("You have already read this book!");
      bookOBJ.users = bookOBJ.users.filter((user)=>{
            return user.id !== userOBJ.id;
      })

      this.adapter.patch(bookOBJ, bookOBJ.id)

      this.eventForShowBook()

    }else{
      bookOBJ.users.push(userOBJ)

      this.adapter.patch(bookOBJ, bookOBJ.id)

      this.eventForShowBook()
      // list.appendChild(li)
    }
  }


}
