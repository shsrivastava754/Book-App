const express = require('express');
const app = express();
const router = express.Router();
const booksController = require('../controllers/booksController');
const bodyParser = require('body-parser').json();

// Routes for CRUD of Books Model
router.get('/',booksController.getBooks);
router.post('/',bodyParser,booksController.addBook);
router.get('/:id',booksController.getById);
router.put('/:id',bodyParser,booksController.updateBook);
router.delete('/:id',booksController.deleteBook);

module.exports = router;
