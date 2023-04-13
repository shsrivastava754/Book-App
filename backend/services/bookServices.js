const Books = require('../database/Books');
const User = require('../database/Users');

const findBooks = async (userId)=>{
    let books = await Books.find({'donatedById': {$ne: userId}});
    return books;
};

const findOneBook = async(title)=>{
    let book = await Books.findOne({title:title});
    return book;
};

const updateQuantity = async(book,quantity)=>{
    await Books.updateOne({title:book.title},
    {
        $set: {
            quantity: quantity+book.quantity
        }
    });

    return book;
}

const addNewBook = async(body)=>{
    const user = await User.findOne({_id:body.donatedById});
    let newBook = new Books({
        title:body.title,
        author:body.author,
        description:body.description,
        price:body.price,
        quantity:body.quantity,
        status:"available",
        donatedById:user._id,
        donatedByEmail:user.email
    });

    await newBook.save();
    return newBook;
};

module.exports.findBooks = findBooks;
module.exports.findOneBook = findOneBook;
module.exports.updateQuantity = updateQuantity;
module.exports.addNewBook = addNewBook;