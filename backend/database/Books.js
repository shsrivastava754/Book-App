const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const Bookschema = new mongoose.Schema({
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
  isDeleted: Boolean
});

const Books = new mongoose.model("Books", Bookschema);
module.exports = Books;
