const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const Bookschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        require: true,
        type: String
    },
    quantity: Number,
    description: String,
    price: Number,
    status: String,
    donatedBy: String
});

const Books = new mongoose.model("Books", Bookschema);
module.exports = Books;