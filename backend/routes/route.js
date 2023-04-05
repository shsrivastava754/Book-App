const express = require('express');
const app = express();
const router = express.Router();
const booksController = require('../controllers/booksController');
const usersController = require('../controllers/usersController');
const cartController = require('../controllers/cartsController');
const bodyParser = require('body-parser').json();

// Routes for CRUD of Books Model
router.get('/',booksController.getBooks);
router.post('/',bodyParser,booksController.addBook);
router.get('/:id',booksController.getById);
router.put('/:id',bodyParser,booksController.updateBook);
router.delete('/:id',booksController.deleteBook);

// Routes for authentication of users
router.get('/users/getUsers',usersController.getUsers);
router.post('/register',bodyParser,usersController.register);
router.post('/login',bodyParser,usersController.login);

// Routes for cart
router.post('/users/addToCart',bodyParser,usersController.addToCart);
router.post('/users/returnCartItems',bodyParser,usersController.returnCartItems);


module.exports = router;
