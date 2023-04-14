const Books = require('../database/Books');
const User = require('../database/Users');
const bookServices = require('../services/bookServices');

// Function to get all books at once
const getBooks = async (req,res)=>{
    let books;
    try {
        books = await bookServices.findBooks(req.body.userId);
    } catch (err) {
        console.log(err);
    }

    if(!books){
        return res.status(400).json({message:"No books found"});
    }

    return res.status(200).json({books});
}

// Function to add book in database
const addBook = async(req,res)=>{
    let newBook;

    try {
        const book = await bookServices.findOneBook(req.body.title);
        if(book){
                newBook = bookServices.updateQuantity(book,req.body.quantity);
        } else {
            newBook = bookServices.addNewBook(req.body);
        }
    } catch (error) {
        console.log(error);
    }

    if(!newBook){
        return res.status(500).json({message:"Not able to add book"});
    }

    return res.status(201).json({newBook});
};

// Function to get a book by id
const getById = async(req,res)=>{
    const id = req.params.id.slice(1);
    let book;
    try {
        book = await bookServices.findBookById(id);
    } catch (error) {
        console.log(error);
    }

    if(!book){
        return res.status(500).json({message:"Not able to get book"});
    }

    return res.status(201).json({book});
};

// Function to update a book
const updateBook = async(req,res)=>{
    const id = req.params.id;
    let book;

    try {
        book = await bookServices.updateBook(id,req.body);
    } catch (error) {
        console.log(error);
    }

    if(!book){
        return res.status(500).json({message:"Not able to update book"});
    }

    return res.status(201).json({message:"Edited successfully"});
}

// Function to delete a book
const deleteBook = async(req,res)=>{
    const id = req.params.id;
    let book;

    try {
        book = await bookServices.removeBook(id);
    } catch (error) {
        console.log(error);
    }

    if(!book){
        return res.status(500).json({message:"Not able to delete book"});
    }

    return res.status(201).json({message:"Deleted successfully"});
}

const deleteAllBooks = async (req,res)=>{
    try {
        await bookServices.deleteAllBooks;
        return res.status(201).json({message:"Deleted all books"})
    } catch (error) {
        console.log(error);
    }
}

module.exports.getBooks = getBooks;
module.exports.addBook = addBook;
module.exports.getById = getById;
module.exports.updateBook = updateBook;
module.exports.deleteBook = deleteBook;
module.exports.deleteAllBooks = deleteAllBooks;