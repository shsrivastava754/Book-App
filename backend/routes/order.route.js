const express = require("express");
const bodyParser = require("body-parser").json();
const OrderController = require("../controllers/order.controller");

const router = express.Router();

// Routes for order

// Gets list of orders of an user
router.get("/users/orders/:id", OrderController.getUserOrders);

// Adds an order to the order model
router.post("/users/orders/addOrder", bodyParser, OrderController.addOrder);

module.exports = router;
