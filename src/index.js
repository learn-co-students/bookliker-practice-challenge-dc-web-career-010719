document.addEventListener("DOMContentLoaded", function() {
  Adapter.getBooks()
  bookList().addEventListener('click', handleListClick)
  bookShow().addEventListener('click', handleReadClick)
});
