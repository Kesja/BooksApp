'use strict';
{
  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      images: '.book__image',
      filters: '.filters',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
  
  class BookList {
    constructor(){
      const thisBook = this;
      
      thisBook.filters = [];
      this.data = dataSource.books;

      thisBook.render();
      thisBook.getElements();
      thisBook.initAction();
      
    }

    getElements(){
      const thisBook = this;

      thisBook.dom = {};
      thisBook.dom.booksList = document.querySelector(select.containerOf.booksList);
      thisBook.dom.filterForm = document.querySelector(select.containerOf.filters);
    }

    render(){
      const thisBook = this;
      for(let book of this.data){
        const ratingBgc = thisBook.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        book['ratingBgc'] = ratingBgc;
        book['ratingWidth'] = ratingWidth;
  
        const generatedHTML = templates.books(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.containerOf.booksList);
        bookContainer.appendChild(generatedDOM);
      }
    }

    initAction(){
      const thisBook = this;
      let favoriteBooks = [];

      thisBook.dom.booksList.addEventListener('dblclick', function(event){
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
      
      thisBook.dom.filterForm.addEventListener('click', function(event){
        const element = event.target;

        if(element.tagName === 'INPUT' && element.type === 'checkbox' && element.name === 'filter') {
          if(element.checked === true){
            thisBook.filters.push(element.value);
          } else {
            thisBook.filters.splice(thisBook.filters.indexOf(element.value), 1);
          }
        }
        thisBook.filter();
      });
    }

    filter() {
      const thisBook = this;

      for(let book of this.data){
        let shouldBeHidden = false;
        for(let filter of thisBook.filters){
          if(!book.details[filter] === false){
            shouldBeHidden = true;
            break;
          } 
        }
        const bookImage = thisBook.dom.booksList.querySelector('.book__image[data-id="' + book.id + '"]');
        if(shouldBeHidden === true){
          bookImage.classList.add('hidden');
        } 
        if(shouldBeHidden === false) {
          bookImage.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      let background = '';
  
      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }
  new BookList();
}