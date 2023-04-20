require("dotenv").config();

const express = require("express");
const connection = require("./database/connection");
const path = require("path");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const expressSession = require("express-session");

const app = express();

app.use(cors());

app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require(path.join(__dirname, "routes/route.js")));

app.listen(process.env.PORT, () => {
  console.log(`Backend server running on port ${process.env.PORT}`);
});
