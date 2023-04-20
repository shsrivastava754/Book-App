const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbScehma = new mongoose.Schema({
  name: String,
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: String,
});

const Users = new mongoose.model("Users", dbScehma);

module.exports = Users;
