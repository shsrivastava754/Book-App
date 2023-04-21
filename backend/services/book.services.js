const { ObjectId } = require("mongodb");
const Books = require("../database/Books");
const User = require("../database/Users");

/**
 * Function to find books donated by the user
 * @param {String} userId
 * @returns {Array} books list donated by user
 */
const findBooks = async (userId) => {
  let books = await Books.find({ donatedById: { $ne: userId } });
  return books;
};

/**
 * Function to find a book by title
 * @param {String} title  - Title of the book
 * @returns {Object} a book with given title
 */
const findOneBook = async (title) => {
  let book = await Books.findOne({ title: title });
  return book;
};

/**
 * Function to update the quantity of the book
 * @param {Object} book
 * @param {Number} quantity
 * @returns {Object} updated book
 */

const updateQuantity = async (book, quantity) => {
  await Books.updateOne(
    { title: book.title },
    {
      $set: {
        quantity: quantity + book.quantity,
      },
    }
  );

  return book;
};

/**
 * Function to add a new book
 * @param {Object} body - A object with details of the book to be added
 * @returns {Object} object of the new book
 */
const addNewBook = async (body) => {
  const user = await User.findOne({ _id: body.donatedById });
  console.log(user);
  let newBook = new Books({
    title: body.title,
    author: body.author,
    description: body.description,
    price: body.price,
    quantity: body.quantity,
    status: "available",
    donatedById: user._id,
    donatedByEmail: user.email,
  });

  await newBook.save();
  return newBook;
};

/**
 * Function to find a book by id
 * @param {ObjectId} id
 * @returns {Object} a book with given id
 */
const findBookById = async (id) => {
  const book = await Books.findById(id);
  return book;
};

/**
 * Function to update details of the book
 * @param {ObjectId} id
 * @param {Object} body - Object of the book details
 * @returns {Object} updated book
 */
const updateBook = async (id, body) => {
  let book = await Books.findByIdAndUpdate(id, {
    title: body.title,
    author: body.author,
    description: body.description,
    price: body.price,
    quantity: body.quantity,
  });

  book.save();
  return book;
};

/**
 * Function to delete a book from collection by ID
 * @param {ObjectId} id
 * @returns {Object} message of the removed book
 */
const removeBook = async (id) => {
  const book = await Books.findByIdAndRemove(id);
  return book;
};

/**
 * Function to delete all books at once
 */
const deleteAllBooks = async () => {
  await Books.deleteMany({});
};

module.exports = {
  findBooks,
  findOneBook,
  updateQuantity,
  addNewBook,
  findBookById,
  updateBook,
  removeBook,
  deleteAllBooks,
};
