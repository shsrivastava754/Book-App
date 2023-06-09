require("dotenv").config();

const express = require("express");
const expressSession = require("express-session");
const path = require("path");
const cors = require("cors");

const DbUtil = require("./database/connection");

// Initializing the express app
const app = express();

app.use(express.json());

// Middleware used for secure transmission between backend and frontend
app.use(cors());

// Middleware used for Express session for Google login
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);

// Connecting to the database
DbUtil.connect();

// Middleware for routes
app.use("/", require(path.join(__dirname, "routes/cart.route.js")));
app.use("/", require(path.join(__dirname, "routes/users.route.js")));
app.use("/", require(path.join(__dirname, "routes/books.route.js")));
app.use("/", require(path.join(__dirname, "routes/order.route.js")));

// Creating the server for backend
app.listen(process.env.PORT, () => {
  console.log(`Backend server running on port ${process.env.PORT}`);
});
