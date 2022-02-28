'use strict';
{
  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      images: '.book__image',
      rating: 'book__rating__fill'
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
      
      const ratingBgc = determineRatingBgc(book.rating);
      book['ratingBgc'] = ratingBgc;
      console.log(ratingBgc)

      const ratingWidth = book.rating * 10;
      console.log('bgc', ratingBgc);
      book['ratingWidth'] = ratingWidth;
      console.log('width', ratingWidth);

    }
  }

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
    
    filterForm.addEventListener('click', function(event){
      const element = event.target;
      console.log(element);
      if(element.tagName === 'INPUT' && element.type === 'checkbox' && element.name === 'filter') {
        if(element.checked === true){
          filters.push(element.value);
        } else {
          filters.splice(filters.indexOf(element.value), 1);
        }
        console.log(filters);
      }
      filter();
    });
  }

  const filters = [];
  const filterForm = document.querySelector('.filters');
  const booksList = document.querySelector('.books-list');

  function filter() {
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      for(let filter of filters){
        if(!book.details[filter] === false){
          shouldBeHidden = true;
          break;
        } 
      }
      const bookImage = booksList.querySelector('.book__image[data-id="' + book.id + '"]');
      console.log(bookImage);
      if(shouldBeHidden === true){
        bookImage.classList.add('hidden');
      } 
      if(shouldBeHidden === false) {
        bookImage.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){
    let background = '';

    if(rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if(rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }
  render();
  initAction();
}