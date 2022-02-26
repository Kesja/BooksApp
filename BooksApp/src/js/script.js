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

  function initAction(){
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
    } 
      
    
   
  }

  render();
  initAction();
}