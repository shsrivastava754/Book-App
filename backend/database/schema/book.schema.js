const mongoose = require("mongoose");

// This allows for more flexibility in querying the database, as queries can include fields that are not explicitly defined in the schema.
mongoose.set("strictQuery", false);

// For using ObjectId datatype of mongoose package
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const BookSchema = new mongoose.Schema({
  // Name of the book
  title: {
    type: String,
    required: true,
  },

  // Author of the book
  author: {
    require: true,
    type: String,
  },

  // Quantity of the book in collection
  quantity: Number,

  // Description of the book
  description: String,

  // Actual Price of book
  price: Number,

  // Selling Price of book
  sale_price: Number,

  // Status of the book whether it is Available or Sold
  status: String,

  // ID of the user who donated the book
  donatedById: ObjectId,

  // Email ID of the user who donated the book
  donatedByEmail: String,

  // Boolean variable whether the book is deleted or not (For soft delete)
  isDeleted: Boolean,
});

const BooksModel = new mongoose.model("Books", BookSchema);
module.exports = BooksModel;
