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
  function render(){//added new function render
    //const thisBook = this;
    
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
    const thisBook = this;
    const favoriteBooks = [];
    const bookImages = document.querySelectorAll(select.containerOf.images);
    for (let image of bookImages){
      image.addEventListener('dblclick', function (event){
        event.preventDefault();
        image.classList.add('favorite');
        const idBook = thisBook.booksList.getAttribute('data-id');
        favoriteBooks.push(idBook);
      });
    }
  }
  render();
  initActions();
}