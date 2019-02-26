document.addEventListener("DOMContentLoaded", function() {
getBooks()
let likerList
function getBooks(){
  fetch('http://localhost:3000/books')
  .then(res => res.json())
  .then(json => json.forEach(function(book){listBook(book)}))
  }

function listBook(book){
  let bookLi = document.createElement('li')
  let bookUl = document.querySelector("#list")
  bookLi.innerHTML = book.title
  bookLi.id = book.id
  bookUl.appendChild(bookLi)
  bookLi.addEventListener("click", () => showBook(book))
  }
let showPanel
function showBook(book){
showPanel = document.querySelector("#show-panel")
showPanel.innerHTML = ''
let title = document.createElement("h2")
title.innerHTML = book.title
let image = document.createElement("img")
image.src = book.img_url
let description = document.createElement("p")
description.innerHTML = book.description
let likeButton = document.createElement("button")
likeButton.innerHTML = "Like Book"
likeButton.id = book.id

let likers = book.users
likerList = document.createElement("div")
likers.forEach(function(liker){likerList.innerHTML += ` ${liker.username}`})

showPanel.append(title, image, description, likerList, likeButton)
likeButton.addEventListener("click", ()=>likeBook(book))
}

function likeBook(book){

if (book.users.map(user => user.id).includes(1)){
  deleteBook(book)
}else{
  let pouros = {"id":1, "username":"pouros"}
  book.users.push(pouros)
   let data = {users : book.users}
  likerList.innerHTML += " pouros"
  fetch(`http://localhost:3000/books/${book.id}`,{
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(data)
  })
}

function deleteBook(book){
  showPanel.innerHTML = ''
  
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: "DELETE"
  })
}





}










});
