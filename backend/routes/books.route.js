const express = require("express");

const BooksController = require("../controllers/books.controller");
const tokenMiddleware = require('../middlewares/token.middleware');

const router = express.Router();

// Routes for CRUD of Books Model
router.post("/books/getBooks", tokenMiddleware, BooksController.getBooks);
router.post("/", tokenMiddleware, BooksController.addBook);
router.get("/:id", tokenMiddleware, BooksController.findBookById);
router.put("/:id", tokenMiddleware, BooksController.updateBook);
router.delete("/:id", BooksController.deleteBook);
router.post("/books/requestBook", tokenMiddleware, BooksController.requestBook);

module.exports = router;