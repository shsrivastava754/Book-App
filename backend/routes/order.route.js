const express = require("express");

const OrderController = require("../controllers/order.controller");
const tokenMiddleware = require('../middlewares/token.middleware');

const router = express.Router();

// Routes for order

// Gets list of orders of an user
router.get("/users/orders/:id", tokenMiddleware, OrderController.getUserOrders);

// Adds an order to the order model
router.post("/users/orders/addOrder", tokenMiddleware, OrderController.addOrder);

// Gets all the order for admin
router.get("/admin/orders/getOrders", tokenMiddleware, OrderController.getOrders);

// Gets all the order for admin
router.get("/orders/:id", tokenMiddleware, OrderController.getBooksInOrder);

module.exports = router;
