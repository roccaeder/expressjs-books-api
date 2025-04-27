const Book = require('../models/book');

// Obtener todos los libros
exports.getAllBooks = (req, res) => {
  res.json(Book.all());
};

// Obtener un libro por ID
exports.getBookById = (req, res) => {
  const book = Book.find(req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};

// Crear un nuevo libro
exports.createBook = (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and Author are required' });
  }
  const newBook = Book.create({ title, author });
  res.status(201).json(newBook);
};

// Actualizar un libro
exports.updateBook = (req, res) => {
  const updated = Book.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Book not found' });
  res.json(updated);
};

// Eliminar un libro
exports.deleteBook = (req, res) => {
  const deleted = Book.delete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Book not found' });
  res.status(204).send();
};
