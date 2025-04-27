const express = require('express');
const app = express();
const booksRoutes = require('./routes/books');

// Middlewares
app.use(express.json()); // Para parsear JSON en las requests

// Routes
app.use('/books', booksRoutes);

// No iniciar el servidor aquí, sino exportar la app
// El servidor solo se debe iniciar cuando la aplicación se ejecute normalmente
/* istanbul ignore next */
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app; // Exportamos la app