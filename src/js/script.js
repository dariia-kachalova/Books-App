('use strict');
{
  const select = {
    templateOf: {
      bookTemplate: '#template-book',//adding reference to template
    },
    containerOf: {
      booksList: '.books-list',
    },
    booksImages: {
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
  render();
}