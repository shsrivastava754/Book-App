const express = require("express");
const bodyParser = require("body-parser").json();
const UsersController = require("../controllers/users.controller");

const router = express.Router();

// Routes for authentication of users
router.post("/users/getUsers", bodyParser, UsersController.getUsers);
router.post("/register", bodyParser, UsersController.register);
router.post("/login", bodyParser, UsersController.login);
router.get("/users/getDonations/:id", UsersController.countDonations);
router.get("/users/:id", UsersController.getUser);
router.post("/registerGoogleUser", bodyParser, UsersController.registerGoogleUser);

module.exports = router;
