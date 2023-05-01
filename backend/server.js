require("dotenv").config();

const express = require("express");
const expressSession = require("express-session");
const path = require("path");
const cors = require("cors");
const passport = require("passport");

const passportSetup = require("./config/passport");
const DbUtil = require('./database/connection');

// Initializing the express app
const app = express();

// Middleware used for secure transmission between backend and frontend
app.use(cors());

// Middleware used for Express session for Google login
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Connecting to the database
DbUtil.connect();

// Middleware for routes
app.use("/", require(path.join(__dirname, "routes/google.route.js")));
app.use("/", require(path.join(__dirname, "routes/cart.route.js")));
app.use("/", require(path.join(__dirname, "routes/users.route.js")));
app.use("/", require(path.join(__dirname, "routes/books.route.js")));



// Creating the server for backend
app.listen(process.env.PORT, () => {
  console.log(`Backend server running on port ${process.env.PORT}`);
});
