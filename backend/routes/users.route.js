const express = require("express");

const UsersController = require("../controllers/users.controller");
const tokenMiddleware = require("../middlewares/token.middleware");

const router = express.Router();

// Routes for getting users
router.post("/users/getUsers", tokenMiddleware, UsersController.getUsers);

// Routes for registering and login of user
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);

// Routes for getting a single user and also for google log in
router.get("/users/:id", tokenMiddleware, UsersController.getUser);
router.post("/registerGoogleUser", UsersController.registerGoogleUser);

// Routes for counting and getting the donations done by a user
router.get("/users/getDonations/:id", tokenMiddleware, UsersController.countDonations);
router.get("/users/donations/:id", tokenMiddleware, UsersController.getDonations);

// Routes for getting and saving the address of the user
router.get("/users/info/getAddress", tokenMiddleware, UsersController.getAddress);
router.post("/users/addAddress", tokenMiddleware, UsersController.addAddress);

// Routes for sending and verifying OTP of the user 
router.post("/sendOtp", UsersController.sendOtp);
router.post("/verifyOtp", UsersController.verifyOtp);

module.exports = router;
