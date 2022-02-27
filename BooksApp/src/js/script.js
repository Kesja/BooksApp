'use strict';
{
  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      images: '.book__image',
    },
  };
  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
  function render(){
    for(let book of dataSource.books){
      const generatedHTML = templates.books(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(generatedDOM);
    }
  }

  /*function initAction(){
    const favoriteBooks = [];
    
    const booksImages = document.querySelectorAll(select.containerOf.images);
    const booksList = document.querySelector(select.containerOf.booksList);
    console.log(booksList);
    for(let image of booksImages) {
      image.addEventListener('dblclick', function (event){
        event.preventDefault();
        image.classList.toggle('favorite');
       
        const bookId = image.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)){
          favoriteBooks.push(bookId);
        } else {
          favoriteBooks.pop(favoriteBooks);
        }
        console.log(favoriteBooks);
      });
    } */

  function initAction(){
    let favoriteBooks = [];
    const booksList = document.querySelector(select.containerOf.booksList);
    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      const book = event.target.offsetParent;
      
      if(book.classList.contains('book__image')){
        book.classList.toggle('favorite');
        const bookId = book.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)){
          favoriteBooks.push(bookId);
        } else {
          favoriteBooks = favoriteBooks.filter(function(item){
            return item !== bookId;
          });
        }
        console.log('Fav',favoriteBooks);
      }
    });
  }

  render();
  initAction();
}