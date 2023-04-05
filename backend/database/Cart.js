const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const Cartschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        require: true,
        type: String
    },
    quantity: Number,
    price: Number,
    totalPrice: Number
});

const Books = new mongoose.model("Cart", Cartschema);
module.exports = Books;