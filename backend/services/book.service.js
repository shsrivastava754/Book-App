const { ObjectId } = require("mongodb");
const BookModel = require("../database/schema/book.schema");
const UserModel = require("../database/schema/user.schema");
const UserService = require("../services/user.service");
const EmailService = require("../services/email.service");

/**
 * Class representing a book service.
 */
class BookService {
  /**
   * Number of books in the collection
   * @returns {Integer} number of books
   */
  static async countBooks(userId) {
    const booksCount = await BookModel.countDocuments({
      isDeleted: false,
      donatedById: { $ne: userId },
    });
    return booksCount;
  }

  /**
   * Function to find books donated by the user
   * @param {String} userId
   * @returns {Array} books list donated by user
   */
  static async findBooks(userId) {
    const books = await BookModel.find({
      donatedById: { $ne: userId },
      isDeleted: false,
    });
    return books;
  }

  /**
   * Function to find a book by title
   * @param {String} title  - Title of the book
   * @returns {Object} a book with given title
   */
  static async findOneBook(title) {
    const book = await BookModel.findOne({ title: title });
    return book;
  }

  /**
   * Function to update the quantity of the book
   * @param {Object} book
   * @param {Number} quantity
   * @returns {Object} updated book
   */
  static async updateQuantity(book, quantity) {
    await BookModel.updateOne(
      { title: book.title },
      {
        $set: {
          quantity: quantity + book.quantity,
        },
      }
    );

    return book;
  }

  /**
   * Function to add a new book
   * @param {Object} body - A object with details of the book to be added
   * @returns {Object} object of the new book
   */
  static async addNewBook(body) {
    const user = await UserModel.findOne({ _id: body.donatedById });
    const newBook = new BookModel({
      title: body.title,
      author: body.author,
      description: body.description,
      price: body.price,
      sale_price: body.sale_price,
      quantity: body.quantity,
      status: "available",
      donatedById: user._id,
      donatedByEmail: user.email,
      isDeleted: false,
    });

    await newBook.save();
    return newBook;
  }

  /**
   * Function to find a book by id
   * @param {ObjectId} id
   * @returns {Object} a book with given id
   */
  static async findBookById(id) {
    const book = await BookModel.findById(id);
    return book;
  }

  /**
   * Function to update details of the book
   * @param {ObjectId} id
   * @param {Object} body - Object of the book details
   * @returns {Object} updated book
   */
  static async updateBook(id, body) {
    const book = await BookModel.findByIdAndUpdate(id, {
      title: body.title,
      author: body.author,
      description: body.description,
      sale_price: body.sale_price,
      price: body.price,
      quantity: body.quantity,
    });

    book.save();
    return book;
  }

  /**
   * Function to delete a book from collection by ID
   * @param {ObjectId} id
   * @returns {Object} message of the removed book
   */
  static async removeBook(id) {
    const book = await BookModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    book.save();
    return book;
  }

  /**
   * Function for pagination
   * @param {Number} skip
   * @param {Number} limit
   * @returns {Array} filtered books
   */
  static async returnFilteredBooks(skip, limit, userId, searchQuery,category) {
    let books,filterCondition;

    // Setting condition for select filter
    if(category==="available"){
      filterCondition = {quantity:{$gt:0}}
    } else if (category==="sold"){
      filterCondition = {quantity:0};
    } else {
      filterCondition = {};
    }

    books = await BookModel.find({
      donatedById: { $ne: userId },
      isDeleted: false,
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { author: { $regex: searchQuery, $options: "i" } },
      ]
    }).find(filterCondition)
      .sort({ _id: -1 }).skip(skip).limit(limit);
    
      return books;
  }

  /**
   * Updated the quantities of book after checkout
   * @param {String} bookId
   * @param {Number} quantity
   */
  static async updateQuantities(bookId, quantity) {
    const book = await BookModel.findOne({ _id: bookId });

    const updatedBook = await BookModel.findByIdAndUpdate(bookId, {
      quantity: book.quantity - quantity,
    });

    updatedBook.save();
  }

  /**
   * Requests a book from admin
   * @param {Object} body
   * @returns a status message
   */
  static async requestBook(body) {
    const user = await UserService.findUserById(body.userId);

    const name = "Admin";
    const bookName = body.bookName;
    const author = body.author;
    const productName = "Book App";
    const productLink = "https://mailgen.js/";

    const intro = `${user.name} requested a book`;
    const tableData = [
      {
        Name: bookName,
        Author: author,
      },
    ];

    const outro = `New Book Requested by ${user.email}`;
    const userEmail = process.env.EMAIL;
    const subject = "Someone requested a book";

    const emailObj = {
      intro,
      outro,
      tableData,
      subject,
      productName,
      productLink,
      name,
      userEmail,
    };

    const result = await EmailService.sendEmail(emailObj);
    return result;
  }
}

module.exports = BookService;
