const mongoose = require("mongoose");

// This allows for more flexibility in querying the database, as queries can include fields that are not explicitly defined in the schema.
mongoose.set("strictQuery", false);

// For using ObjectId datatype of mongoose package
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const CartSchema = new mongoose.Schema({
  // Name of the book
  title: {
    type: String,
    required: true,
  },

  // ID of the book from the books collection
  bookId: {
    type: ObjectId,
    required: true,
  },

  // Author of the book
  author: {
    require: true,
    type: String,
  },

  // Quantity of book in the cart
  quantity: Number,

  // Actual price of the book
  price: Number,

  // Selling price of the book
  sale_price: Number,

  // ID of the user that has added the book in the cart
  userId: ObjectId,

  // Email of the user that added in the cart
  userEmail: String,

  // Status of the book
  status: String
},{ timestamps: true });

const Books = new mongoose.model("Cart", CartSchema);
module.exports = Books;
