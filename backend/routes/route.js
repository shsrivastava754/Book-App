const express = require("express");
const app = express();
const router = express.Router();
const booksController = require("../controllers/books.controller");
const usersController = require("../controllers/users.controller");
const cartController = require("../controllers/cart.controller");
const bodyParser = require("body-parser").json();
const passport = require("passport");
const LocalStorage = require("node-localstorage").LocalStorage;

localStorage = new LocalStorage("./scratch");

// Routes for CRUD of Books Model
router.post("/books/getBooks", bodyParser, booksController.getBooks);
router.post("/", bodyParser, booksController.addBook);
router.get("/:id", booksController.getById);
router.put("/:id", bodyParser, booksController.updateBook);
router.delete("/:id", booksController.deleteBook);
router.delete("/books/deleteAllBooks", booksController.deleteAllBooks);

// Routes for authentication of users
router.get("/users/getUsers", usersController.getUsers);
router.post("/register", bodyParser, usersController.register);
router.post("/login", bodyParser, usersController.login);
router.get("/users/getDonations/:id", usersController.donations);

// Routes for cart
router.post("/cart/addToCart", bodyParser, cartController.addToCart);
router.post("/cart/getCartItems", bodyParser, cartController.getCartItems);
router.post("/cart/clearCart", bodyParser, cartController.clearCart);
router.delete("/cart/clearCartModel", cartController.clearCartModel);
router.delete("/cart/:itemId/:userId", cartController.deleteItem);
router.post("/cart/compareQuantity",bodyParser,cartController.compareQuantity);

router.get("/login/success", (req, res) => {
  // if(req.user){
  res.status(200).json({
    error: false,
    message: "Successfully logged in",
    user: localStorage.getItem("user"),
  });
  // } else {
  //     res.status(403).json({error:true,message:"Not authorized"});
  // }
});

router.get("/failedLogin", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Failed google login",
  });
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.BOOK_PAGE,
    failureRedirect: "/failedLogin",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    localStorage.clear();
    res.redirect(process.env.CLIENT_URL);
  });
});

router.get(
  "/getUserData/returnLocalstorage",
  usersController.returnlocalStorage
);

module.exports = router;
