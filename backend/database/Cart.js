const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const Cartschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bookId: {
    type: ObjectId,
    required: true,
  },
  author: {
    require: true,
    type: String,
  },
  quantity: Number,
  price: Number,
  totalPrice: Number,
  userId: ObjectId,
  userEmail: String,
});

const Books = new mongoose.model("Cart", Cartschema);
module.exports = Books;
