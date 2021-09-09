('use strict');
{
  const select = {
    templateOf: {
      bookTemplate: '#template-book',//adding reference to template
    },
    containerOf: {
      booksList: '.books-list',
      images: '.books-list .book__image',
    }
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };
  const booksList = document.querySelector('.books-list');

  class BooksList {
    constructor() {
      const thisBook = this;
      thisBook.initData();
      thisBook.getElements();
      thisBook.render();
      thisBook.initActions();
    }
  
    initData() {
      this.data = dataSource.books;
      const thisBook = this;
      thisBook.favoriteBooks = [];
      thisBook.filters = [];
    }

    getElements() {
      const thisBook = this;
      thisBook.form = document.querySelector('.filters');
    }

    //added new function render
    render(){
      const thisBook = this;
      for (let eachBook of dataSource.books){
        eachBook.ratingBgc = thisBook.determineRatingBgc(eachBook.rating);
        eachBook.ratingWidth = eachBook.rating * 10;
        //generate HTML based on template
        const generatedHTML = templates.bookTemplate(eachBook);
        // generating Dom element
        const element = utils.createDOMFromHTML(generatedHTML);
        // adding generated element as child
        const bookListContainer = document.querySelector(select.containerOf.booksList);
        bookListContainer.appendChild(element);
      }
    }

    //adding book to favorite
    initActions(){
      const booksImages = booksList.querySelectorAll('.book__image');
      const favoriteBook = 'favorite';
      const thisBook = this;

      for (let bookImage of booksImages) {
        console.log('bookImage', bookImage);
        const favoriteBookAtribute = bookImage.getAttribute('data-id');
        bookImage.addEventListener('dblclick', function (event) {
          event.preventDefault();
          const clickedElementIsBook = event.target.offsetParent.classList.contains('book__image');
          const theBookIndex = thisBook.favoriteBooks.indexOf(favoriteBookAtribute);
          if (clickedElementIsBook == true) {
            const favoriteBookAtribute =
            event.target.offsetParent.getAttribute('data-id');

            if (!thisBook.favoriteBooks[theBookIndex]) {
              thisBook.favoriteBooks.push(favoriteBookAtribute);
              event.target.offsetParent.classList.add(favoriteBook);
              console.log('add ' + favoriteBookAtribute + ' to favoriteBooks');
            } else {
              thisBook.favoriteBooks.splice(theBookIndex, 1);
              console.log('remove ' + favoriteBookAtribute + ' to favoriteBooks');
              event.target.offsetParent.classList.remove(favoriteBook);
            }
          }
        });
      }

      //adding filters (showing in console)
      thisBook.form.addEventListener('click', function(event) {
        const clickedElement = event.target;
        const tagName = clickedElement.tagName;
        const type = clickedElement.getAttribute('type');
        const name = clickedElement.getAttribute('name');
        const value = clickedElement.getAttribute('value');
        const clickedElementIsCheckbox = tagName == 'INPUT' && type == 'checkbox' && name == 'filter';
        if (clickedElementIsCheckbox && clickedElement.checked == true) {
          console.log('Add', value, 'to filters');
          thisBook.filters.push(value);
        } else if (clickedElementIsCheckbox && clickedElement.checked == false) {
          console.log('Remove', value, 'from filters');
          const valueIndex = thisBook.filters.indexOf(value);
          thisBook.filters.splice(valueIndex, 1);
        }
        thisBook.filterBooks();
      });
      
    }
    
    //adding actions to filtring
    filterBooks(){
      const thisBook = this;
      for (let book of dataSource.books) {
        let shouldBeHidden = false;
        for (const filter of thisBook.filters) {
          if (!book.details[filter] == false){
            shouldBeHidden = true;
            break;
          }
        }
        const bookImage = booksList.querySelector('.book__image[data-id="' + book.id + '"]');
        if (shouldBeHidden === true) {
          bookImage.classList.add('hidden');
        }
        if (shouldBeHidden === false) {
          bookImage.classList.remove('hidden');
        }
      }
    }

    //adding ratings
    determineRatingBgc(rating) {
      let ratingBackground = '';
      if (rating < 6) {
        ratingBackground = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        ratingBackground = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        ratingBackground = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        ratingBackground = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return ratingBackground;
    }
  }
  const app = new BooksList();
}