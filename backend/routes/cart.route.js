const express = require("express");
const bodyParser = require("body-parser").json();
const CartController = require("../controllers/cart.controller");

const router = express.Router();

// Routes for cart

// Adds an item to the cart
router.post("/cart/addToCart", bodyParser, CartController.addToCart);

// Gets the cart items for an user
router.post("/cart/getCartItems", bodyParser, CartController.getCartItems);

// Clears the cart for the user
router.post("/cart/clearCart", bodyParser, CartController.clearCart);

// Change the quantity of items in cart in case of increment and decrement
router.put(
  "/cart/updateQuantity/:userId/:itemId",
  bodyParser,
  CartController.changeQuantity
);

// Deletes and item from the cart
router.delete("/cart/:itemId/:userId", CartController.deleteItem);

// Compare the quantity of item in cart and in books model
router.post(
  "/cart/compareQuantity",
  bodyParser,
  CartController.compareQuantity
);

// Get quantities of book in cart and books model
router.get("/cart/getQuantities/:userId/:itemId/:bookId", CartController.getQuantities)

// Checkout user in case of purchase
router.post("/cart/checkout", bodyParser, CartController.checkout);

// Sends an email to the user/admin in case of checkout
router.post('/cart/sendEmail',bodyParser, CartController.informAdmin);

module.exports = router;
