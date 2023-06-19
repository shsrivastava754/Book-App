const express = require("express");

const UsersController = require("../controllers/users.controller");
const tokenMiddleware = require("../middlewares/token.middleware");

const router = express.Router();

// Routes for authentication of users
router.post("/users/getUsers", tokenMiddleware, UsersController.getUsers);
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.get("/users/getDonations/:id", tokenMiddleware, UsersController.countDonations);
router.get("/users/:id", tokenMiddleware, UsersController.getUser);
router.post("/registerGoogleUser", UsersController.registerGoogleUser);
router.get("/users/donations/:id", tokenMiddleware, UsersController.getDonations);

module.exports = router;
