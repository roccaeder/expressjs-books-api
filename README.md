# 📚 Books API

Basic **Express.js** RESTful API to manage books. This API allows performing CRUD operations (Create, Read, Update, Delete) on a collection of books.

## 🚀 Endpoints

```bash
GET http://localhost:3000/books → View all books

GET http://localhost:3000/books/:id → View a specific book

POST http://localhost:3000/books → Create a new book (send title and author)

PUT http://localhost:3000/books/:id → Update a book

DELETE http://localhost:3000/books/:id → Delete a book
```

### 1. **Create a New Book**

**POST** `/books`

- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "title": "Book Title",
    "author": "Author Name"
  }
  ```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title": "The Little Prince", "author": "Antoine de Saint-Exupéry"}'
```

### 2. **Get All Books**

**GET** `/books`

**Example cURL:**
```bash
curl http://localhost:3000/books
```

---

### 3. **Get a Book by ID**

**GET** `/books/:id`

**Example cURL:**
```bash
curl http://localhost:3000/books/1
```

---

### 4. **Update a Book**

**PUT** `/books/:id`

- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "title": "New Title",
    "author": "New Author"
  }
  ```

**Example cURL:**
```bash
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "The Little Prince (Special Edition)", "author": "Antoine de Saint-Exupéry"}'
```

---

### 5. **Delete a Book**

**DELETE** `/books/:id`

**Example cURL:**
```bash
curl -X DELETE http://localhost:3000/books/1
```

---

## ⚙️ Initial Setup

### Steps to run the API locally:

1. **Clone the repository:**

   If you haven't already, clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/books-api.git
   ```

2. **Install dependencies:**

   Navigate to the project folder and run the following command to install the Node.js dependencies:
   ```bash
   npm install
   ```

3. **Run the server:**

   To start the server in production mode:
   ```bash
   npm start
   ```

4. **Verify that the API is working:**

   Open your browser or Postman and test the API endpoints as detailed in the section above.

   Example test with Postman:
   - **URL**: `http://localhost:3000/books`
   - **Method**: `GET`

5. **Run tests:**

   To execute the testing process:
   ```bash
   npm test
   ```