let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt' }
];

let nextId = 3;

class Book {
  static all() {
    return books;
  }

  static find(id) {
    return books.find(book => book.id === parseInt(id));
  }

  static create(data) {
    const newBook = {
      id: nextId++,
      title: data.title,
      author: data.author
    };
    books.push(newBook);
    return newBook;
  }

  static update(id, data) {
    const book = this.find(id);
    if (!book) return null;
    book.title = data.title || book.title;
    book.author = data.author || book.author;
    return book;
  }

  static delete(id) {
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index === -1) return null;
    books.splice(index, 1);
    return true;
  }
}

module.exports = Book;
