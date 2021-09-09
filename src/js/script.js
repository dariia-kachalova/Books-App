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
  function render(){//added new function render
    const thisBook = this;
    for (let eachBook of dataSource.books){
      //generate HTML based on template
      const generatedHTML = templates.bookTemplate(eachBook);
      // generating Dom element
      const element = utils.createDOMFromHTML(generatedHTML);
      // adding generated element as child
      const bookListContainer = document.querySelector(select.containerOf.booksList);
      bookListContainer.appendChild(element);
    }
  }
  function initActions(){//adding book to favorite
    /*const thisBook = this;
    const favoriteBooks = [];
    const bookImages = document.querySelectorAll(select.containerOf.images);
    for (let image of bookImages){
      image.addEventListener('dblclick', function (event){
        event.preventDefault();
        image.classList.add('favorite');
      });
    }*/
    const booksImages = booksList.querySelectorAll('.book__image');

    const favoriteBook = 'favorite';

    const favoriteBooks = [];
    console.log('favoriteBooks', favoriteBooks);

    for (let bookImage of booksImages) {
      console.log('bookImage', bookImage);

      const favoriteBookAtribute = bookImage.getAttribute('data-id');

      bookImage.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const clickedElementIsBook = event.target.offsetParent.classList.contains('book__image');
        const theBookIndex = favoriteBooks.indexOf(favoriteBookAtribute);
        if (clickedElementIsBook == true) {
          const favoriteBookAtribute =
            event.target.offsetParent.getAttribute('data-id');

          if (!favoriteBooks[theBookIndex]) {
            favoriteBooks.push(favoriteBookAtribute);
            event.target.offsetParent.classList.add(favoriteBook);
            console.log('add ' + favoriteBookAtribute + ' to favoriteBooks');
          } else {
            favoriteBooks.splice(theBookIndex, 1);
            console.log('remove ' + favoriteBookAtribute + ' to favoriteBooks');
            event.target.offsetParent.classList.remove(favoriteBook);
          }
        }
      });
    }
  }
  //adding filters (showing in console)
  const filters = [];

  const form = document.querySelector('.filters');

  form.addEventListener('click', function (event) {
    const clickedElement = event.target;

    const tagName = clickedElement.tagName;

    const type = clickedElement.getAttribute('type');

    const name = clickedElement.getAttribute('name');

    const value = clickedElement.getAttribute('value');
    const clickedElementIsCheckbox = tagName == 'INPUT' && type == 'checkbox' && name == 'filter';

    if (clickedElementIsCheckbox && clickedElement.checked == true) {
      console.log('Add', value, 'to filters');
      filters.push(value);
    } else if (clickedElementIsCheckbox && clickedElement.checked == false) {
      console.log('Remove', value, 'from filters');
      const valueIndex = filters.indexOf(value);
      filters.splice(valueIndex, 1);
    }
    filterBooks();
  });
  //adding actions to filtring
  function filterBooks(){
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
        
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
  render();
  initActions();
  
}