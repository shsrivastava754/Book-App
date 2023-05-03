const express = require("express");
const bodyParser = require("body-parser").json();
const CartController = require("../controllers/cart.controller");

const router = express.Router();

// Routes for cart
router.post("/cart/addToCart", bodyParser, CartController.addToCart);
router.post("/cart/getCartItems", bodyParser, CartController.getCartItems);
router.post("/cart/clearCart", bodyParser, CartController.clearCart);
router.put(
  "/cart/updateQuantity/:userId/:itemId",
  bodyParser,
  CartController.changeQuantity
);
router.delete("/cart/clearCartModel", CartController.clearCartModel);
router.delete("/cart/:itemId/:userId", CartController.deleteItem);
router.post(
  "/cart/compareQuantity",
  bodyParser,
  CartController.compareQuantity
);
router.post("/cart/checkout", bodyParser, CartController.checkout);

module.exports = router;
