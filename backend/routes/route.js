const express = require('express');
const app = express();
const router = express.Router();
const booksController = require('../controllers/booksController');
const usersController = require('../controllers/usersController');
const cartController = require('../controllers/cartsController');
const bodyParser = require('body-parser').json();

// Routes for CRUD of Books Model
router.post('/books/getBooks',bodyParser,booksController.getBooks);
router.post('/',bodyParser,booksController.addBook);
router.get('/:id',booksController.getById);
router.put('/:id',bodyParser,booksController.updateBook);
router.delete('/:id',booksController.deleteBook);
router.delete('/books/deleteAllBooks',booksController.deleteAllBooks);

// Routes for authentication of users
router.get('/users/getUsers',usersController.getUsers);
router.post('/register',bodyParser,usersController.register);
router.post('/login',bodyParser,usersController.login);
router.get('/users/getDonations/:id',usersController.donations);

// Routes for cart
router.post('/cart/addToCart',bodyParser,cartController.addToCart);
router.post('/cart/getCartItems',bodyParser,cartController.getCartItems);
router.post('/cart/clearCart',bodyParser,cartController.clearCart);
router.delete('/cart/clearCartModel',cartController.clearCartModel);
router.delete('/cart/:itemId/:userId',cartController.deleteItem)

module.exports = router;
