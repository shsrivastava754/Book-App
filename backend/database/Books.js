const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    require: true,
    type: String,
  },
  quantity: Number,
  description: String,
  price: Number,
  status: String,
  donatedById: ObjectId,
  donatedByEmail: String,
  isDeleted: Boolean,
});

const BooksModel = new mongoose.model("Books", BookSchema);
module.exports = BooksModel;
