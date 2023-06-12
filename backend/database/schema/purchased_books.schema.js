const mongoose = require("mongoose");

// This allows for more flexibility in querying the database, as queries can include fields that are not explicitly defined in the schema.
mongoose.set("strictQuery", false);

const BooksSchema = new mongoose.Schema({
  // Name of the book
  title: {
    type: String,
    required: true,
  },

  // ID of the book from the books collection
  bookId: {
    type: String,
    required: true,
  },

  // ID of the order from the orders collection
  orderId: {
    type: String,
    required: true,
  },

  // Author of the book
  author: {
    require: true,
    type: String,
  },

  // Quantity of book in the cart
  quantity: Number,

  // Selling price of the book
  sale_price: Number,

  // Person who ordered the book
  userId: {
    type: String,
    required: true,
  },

  // Email of the user that ordered the book
  userEmail: {
    type: String,
    required: true,
  },
},{ timestamps: true });

const Books = new mongoose.model("Purchased", BooksSchema);
module.exports = Books;
