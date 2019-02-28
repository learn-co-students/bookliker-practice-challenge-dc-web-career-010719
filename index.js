document.addEventListener('DOMContentLoaded', init);

let currentUser = { id: 1, username: 'pouros' };

function init() {
  fetchBooks();
}

function fetchBooks() {
  fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books => renderAllBooks(books));
}

function renderAllBooks(books) {
  books.forEach(book => renderEachBook(book));
}

function renderEachBook(book) {
  console.log(book);
  let booksUl = document.querySelector('#list');
  console.log(booksUl);

  let bookLi = document.createElement('li');
  console.log(bookLi);

  bookLi.innerText = book.title;

  //add event listener to a specific book
  bookLi.addEventListener('click', () => {
    renderBookInfo(book);
  });

  booksUl.appendChild(bookLi);
}

function renderBookInfo(book) {
  let showDiv = document.querySelector('#show-panel');

  while (showDiv.firstChild) {
    showDiv.removeChild(showDiv.firstChild);
  }

  let h2 = document.createElement('h2');
  let img = document.createElement('img');
  let p = document.createElement('p');
  let button = document.createElement('button');

  h2.innerText = book.title;
  img.src = book.img_url;
  p.innerText = book.description;
  button.innerText = 'Read';

  button.addEventListener('click', () => {
    likeBook(book);
  });

  showDiv.append(h2, img, p, button);

  book.users.forEach(user => renderUsers(user, showDiv));
}

function renderUsers(user, showDiv) {
  let h4 = document.createElement('h4');
  h4.innerText = user.username;

  showDiv.appendChild(h4);
}

function likeBook(book) {
  let liked = book.users
    .map(user => user.username)
    .includes(currentUser.username);

  if (liked) {
    window.alert("You've read this book already, go away!");
  } else {
    book.users.push(currentUser);

    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ users: book.users })
    })
      .then(res => res.json())
      .then(book => renderBookInfo(book));
  }
}
