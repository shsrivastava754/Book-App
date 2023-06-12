const mongoose = require("mongoose");

// This allows for more flexibility in querying the database, as queries can include fields that are not explicitly defined in the schema.
mongoose.set("strictQuery", false);

// For using ObjectId datatype of mongoose package
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const OrderSchema = new mongoose.Schema({
  // Name of the user
  name: {
    type: String,
    required: true,
  },

  // Email ID or the user
  email: {
    type: String,
    required: true
  },

  // Quantity of books in the order
  quantity: Number,

  // Total price of the order
  total_price: Number,

  // Status of the order   
  status: String,

  // ID of the user that has added the book in the cart
  userId: ObjectId
  
},{ timestamps: true });

const Orders = new mongoose.model("Order", OrderSchema);
module.exports = Orders;
