const express = require("express");
const bodyParser = require("body-parser").json();
const BooksController = require("../controllers/books.controller");
const router = express.Router();

// Routes for CRUD of Books Model
router.post("/books/getBooks", bodyParser, BooksController.getBooks);
router.post("/", bodyParser, BooksController.addBook);
router.get("/:id", BooksController.getById);
router.put("/:id", bodyParser, BooksController.updateBook);
router.delete("/:id", BooksController.deleteBook);
router.get("/books/getPaginatedBooks", BooksController.findFilteredBooks);
router.post("/books/requestBook", bodyParser, BooksController.requestNewBook);

module.exports = router;
