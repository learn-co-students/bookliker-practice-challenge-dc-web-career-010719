document.addEventListener("DOMContentLoaded", init)

let currentUser = {id: 1, username: "pouros"}

function init(){
    getBooks()
}


function getBooks(book) {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(book => book.forEach(renderBooks))
}

function renderBooks(book) {
    let bookList = document.getElementById('list')
    let li = document.createElement('li')

    li.innerText = book.title

    bookList.appendChild(li)
    li.addEventListener('click', () => {showBook(book)})
}

function showBook(book){
    
    let bookDiv = document.getElementById('show-panel')

    bookDiv.innerHTML = ""

    let bookTitle = document.createElement('h3')
    let bookImage = document.createElement('img')
    let bookContent = document.createElement('p')
    let btn = document.createElement('button')
    let userDiv = document.createElement('div')

    bookTitle.innerText = book.title
    bookImage.src = book.img_url    
    bookContent.innerText = book.description
    btn.innerText = 'Read Book'

    for(user of book.users) {
        let h4 = document.createElement('h4')
        h4.innerText = user.username
        userDiv.appendChild(h4)
    }

    bookDiv.append(bookTitle, bookImage, bookContent, userDiv, btn)
    
    btn.addEventListener('click', () => {likeBook(book)})
}

function likeBook(book){
   
    if (book.users.map(i => i.username).includes(currentUser.username)){
        window.alert("You read this already!!")
    } else {

   
    book.users.push(currentUser)


    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({users: book.users})
    })
    .then(res => res.json())
    .then(json => showBook(json))
}
}
