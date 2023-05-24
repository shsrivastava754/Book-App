const BookService = require("../services/book.service");
const EmailService = require("../services/email.service");

/**
 * Class that contains methods to handle CRUD operations on books.
 */
class BookController {
  /**
   * Function to get all books from the Books model
   * @param {Object} req - Request from client side
   * @param {Object} res - Response generated by the function
   * @returns {Response} response status
   */
  static async getBooks(req, res) {
    try {
      const books = await BookService.findBooks(req.body.userId);
      const booksCount = await BookService.countBooks();
      if (!books) {
        return res.status(400).json({ message: "No books found" });
      } else {
        return res.status(200).json({ books: books, booksCount: booksCount });
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Function to add a new book in the Books model
   * @param {Object} req - Request from client side
   * @param {Object} res - Response generated by the function
   * @returns {Response} response status with a newBook object
   */
  static async addBook(req, res) {
    try {
      let newBook;
      // Check if the book exists or not
      const book = await BookService.findOneBook(req.body.title);

      // If it exists then just update the quantity
      if (book) {
        newBook = BookService.updateQuantity(book, req.body.quantity);
      } else {
        newBook = BookService.addNewBook(req.body);
      }

      if (!newBook) {
        return res.status(500).json({ message: "Not able to add book" });
      }

      return res.status(201).json({ newBook });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function to get a book with its id and send its details as a response
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} status code with a json message of book details
   */
  static async getById(req, res) {
    try {
      const id = req.params.id.slice(1);
      const book = await BookService.findBookById(id);

      if (!book) {
        return res.status(500).json({ message: "Not able to get book" });
      }

      return res.status(201).json({ book });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function to update the details of a book by getting its id
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} response whether the book has been edited or not
   */
  static async updateBook(req, res) {
    try {
      const id = req.params.id;
      const book = await BookService.updateBook(id, req.body);
      if (!book) {
        return res.status(500).json({ message: "Not able to update book" });
      }

      return res.status(201).json({ message: "Edited successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function to delete a Book by its ID
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} response status
   */
  static async deleteBook(req, res) {
    try {
      const id = req.params.id;
      const book = await BookService.removeBook(id);
      if (!book) {
        return res.status(500).json({ message: "Not able to delete book" });
      }
      return res.status(201).json({ message: "Deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function to find books with pagination and search
   * @param {Request} req
   * @param {Response} res
   */
  static async findFilteredBooks(req, res) {
    try {
      // Search text
      let query = req.query.search;

      // Page number to get
      let page = Number(req.query.page) || 1;

      // Number fo documents per page
      let limit = Number(req.query.limit) || 3;

      // Formula for pagination, skip is the number of documents to skip from the collection
      let skip = (page - 1) * limit;

      let books = await BookService.returnFilteredBooks(skip, limit, query);

      // Get total number of books
      let totalBooks = await BookService.getBooksSize();
      res
        .status(200)
        .json({ books: books, nbHits: books.length, booksSize: totalBooks });
    } catch (error) {
      res.status(501).json({ message: "Some error" });
    }
  }

  /**
   * Request a new book from admin
   * @param {Request} req
   * @param {Response} res
   */
  static async requestNewBook(req, res) {
    const result = await BookService.requestBook(req.body);
    res.status(201).json({ result });
  }


  static async getFilteredBooks(req,res){
    let page = Number(req.body.page) || 1;

      // Number fo documents per page
      let limit = Number(req.body.limit) || 5;

      // Formula for pagination, skip is the number of documents to skip from the collection
      let skip = (page - 1) * limit;

      let books = await BookService.returnFilteredBooks(skip, limit);

      const booksCount = await BookService.countBooks();
      if (!books) {
        return res.status(400).json({ message: "No books found" });
      } else {
        return res.status(200).json({ books: books, booksCount: booksCount });
      }
  }
}

module.exports = BookController;
