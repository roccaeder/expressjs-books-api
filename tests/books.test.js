const request = require('supertest');
const app = require('../app');

describe('Books API', () => {
  let createdBookId;

  const createBook = async (book = { title: "El Principito", author: "Antoine de Saint-Exupéry" }) => {
    const response = await request(app)
      .post('/books')
      .send(book)
      .set('Content-Type', 'application/json');
    return response;
  };

  describe('POST /books', () => {
    it('should create a new book', async () => {
      const response = await createBook();
      createdBookId = response.body.id;

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('El Principito');
      expect(response.body.author).toBe('Antoine de Saint-Exupéry');
    });

    it('should return 400 if title or author is missing', async () => {
      const response = await createBook({ title: "Incomplete Book" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Title and Author are required');
    });
  });

  describe('GET /books', () => {
    it('should get all books', async () => {
      const response = await request(app).get('/books');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a book by id', async () => {
      const response = await request(app).get(`/books/${createdBookId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('author');
    });

    it('should return 404 if book not found', async () => {
      const response = await request(app).get('/books/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Book not found');
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book', async () => {
      const response = await request(app)
        .put(`/books/${createdBookId}`)
        .send({ title: "El Principito (Edición Especial)", author: "Antoine de Saint-Exupéry" })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("El Principito (Edición Especial)");
    });

    it('should update only the title of a book', async () => {
      const { body: newBook } = await createBook({ title: "Original Title", author: "Original Author" });

      const updateResponse = await request(app)
        .put(`/books/${newBook.id}`)
        .send({ title: "Updated Title" })
        .set('Content-Type', 'application/json');

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.title).toBe("Updated Title");
      expect(updateResponse.body.author).toBe("Original Author");
    });

    it('should update only the author of a book', async () => {
      const { body: newBook } = await createBook({ title: "Another Title", author: "Another Author" });

      const updateResponse = await request(app)
        .put(`/books/${newBook.id}`)
        .send({ author: "Updated Author" })
        .set('Content-Type', 'application/json');

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.title).toBe("Another Title");
      expect(updateResponse.body.author).toBe("Updated Author");
    });

    it('should return 404 if book to update not found', async () => {
      const response = await request(app)
        .put('/books/999')
        .send({ title: "Nonexistent Book" });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Book not found');
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      const { body: bookToDelete } = await createBook({ title: "Temp Book", author: "Temp Author" });

      const response = await request(app).delete(`/books/${bookToDelete.id}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 if book to delete not found', async () => {
      const response = await request(app).delete('/books/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Book not found');
    });
  });
});
