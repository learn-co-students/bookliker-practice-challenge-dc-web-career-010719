class Controller{
    constructor(){
      this.bookAdapter = new Adapter("http://localhost:3000/books")
    }

    bootUp(){
      console.log('Booting up');

      this.bookAdapter.fetchAll().then(json => {this.createBooksArray(json)})

    }

    createBooksArray(json){
      let booksArray = json.map((book)=>{return new Book(book, this.bookAdapter)})
      this.renderBooks(booksArray)
    }

    renderBooks(array){
      this.getBookListElement().innerText = ""
      array.forEach((book)=> {book.render()})
    }
    
    getBookListElement(){
      return document.getElementById('list')
    }



}
