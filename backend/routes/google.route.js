const express = require("express");
const passport = require("passport");
const LocalStorage = require("node-localstorage").LocalStorage;

const usersController = require("../controllers/users.controller");

const router = express.Router();
localStorage = new LocalStorage("./scratch");

router.get("/login/success", (req, res) => {
  res.status(200).json({
    error: false,
    message: "Successfully logged in",
    user: localStorage.getItem("user"),
  });
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
