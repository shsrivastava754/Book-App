const { ObjectId } = require("mongodb");
const BookModel = require("../database/schema/book.schema");
const UserModel = require("../database/schema/user.schema");
const UserService = require("../services/user.service");
const EmailService = require("../services/email/email.service");
const EmailStyle = require("../styles/email.style");

/**
 * Class representing a book service.
 */
class BookService {
  /**
   * Number of books in the collection
   * @returns {Integer} number of books
   */
  static async countBooks(searchQuery,category) {
    let filterCondition;

    // Setting condition for select filter
    if(category==="available"){
      filterCondition = {quantity:{$gt:0}}
    } else if (category==="sold"){
      filterCondition = {quantity:0};
    } else {
      filterCondition = {};
    }

    const books = await BookModel.find({
      $or: [
      { title: { $regex: searchQuery, $options: "i" } },
      { author: { $regex: searchQuery, $options: "i" } },
    ]
    }).find(filterCondition).find({isDeleted: false});

      return books.length;
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
  static async addBook(body) {
    const user = await UserModel.findOne({ _id: body.donatedById });
    body.status = "available";
    body.isDeleted = false;
    body.donatedById = user._id;
    body.donatedByEmail = user.email;
    const newBook = new BookModel(body);

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
  static async deleteBook(id) {
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
  static async getBooks(skip, limit, searchQuery,category) {
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
      // donatedById: { $ne: userId },
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
    const bookName = body.bookName;
    const author = body.author;

    const userEmail = process.env.EMAIL;
    const subject = `Someone requested a book`;
    const name = 'Admin';

    // Table template that is rendered inside the html content
    const tableTemplate = `
        <tr>
          <td>${bookName}</td>
          <td>${author}</td>
        </tr>
    `;

    const style = EmailStyle.returnStyle();

    const html = `
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
      ${style}
    </head>

    <body>
      <h3 class="header">
          Book App
      </h3>
      <div class="container">
          <h3>
              Hi admin,
          </h3>
          <p>
            ${user.name} (${user.email}) requested a book
          </p>
          <table class="table-responsive">
            <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
            </tr>
            </thead>
            <tbody>
            ${tableTemplate}
            </tbody>
          </table>
          
          <p class="mb-0">Yours Truly,</p>
          <p>Book App</p>
      </div>
      <footer class="footer">
          <div class="container">
              <span class="text-muted">© 2023 Book App. All rights reserved.</span>
          </div>
      </footer>
    </body>`

    const emailObj = { userEmail, subject, html, name};

    const result = await EmailService.sendEmail(emailObj);
    return result;
  }
}

module.exports = BookService;
