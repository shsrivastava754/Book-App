const mongoose = require("mongoose");

// This allows for more flexibility in querying the database, as queries can include fields that are not explicitly defined in the schema.
mongoose.set("strictQuery", false);

const dbSchema = new mongoose.Schema({
  // Full name of user
  name: String,

  // Username of user
  username: String,

  // Email ID of user
  email: {
    type: String,
    required: true,
    unique: true
  },

  // Password of user ID
  password: String,

  // Role of the user whether he/she is admin or a normal user
  role: String,
});

const Users = new mongoose.model("Users", dbSchema);

module.exports = Users;
