const CartModel = require("../database/schema/cart.schema");
const BookModel = require("../database/schema/book.schema");
const BookService = require("./book.service");
const EmailService = require("./email/email.service");
const EmailStyle = require("../styles/email.style");
const BooksModel = require("../database/schema/book.schema");

/**
 * Class for Cart Services
 */
class CartService {
  /**
   * Function to return a single item from cart of a particular user
   * @param {ObjectId} userId
   * @param {String} title
   * @returns {Object} the item from the cart collection
   */
  static async returnItem(userId, bookId) {
    const item = await CartModel.findOne({
      userId: userId,
      bookId: bookId,
    });

    return item;
  }

  /**
   * Function to update the quantity of item in the cart of the user
   * @param {Object} item - Object with details of the item
   * @returns {Object} the updated item
   */
  static async updateItemQuantity(item) {
    await CartModel.updateOne(
      { bookId: item.bookId, userId: item.userId },
      {
        $set: {
          quantity: item.quantity + 1,
        },
      }
    );
    return item;
  }

  /**
   * Function to add new item to the cart
   * @param {Object} body
   */
  static async addToCart(body) {
    body.quantity = 1;
    const book = await BookModel.findOne({_id:body.bookId});
    if(book.quantity>0){
      body.status = "Available";
      const cartItem = new CartModel(body);
      await cartItem.save();
      return cartItem;
    }
  }

  /**
   * Function to return cart items of a user
   * @param {ObjectId} id
   * @returns {Array} cart items of a user
   */
  static async getCartItems(id) {
    const items = await CartModel.find({ userId: id });
    return items;
  }

  /**
   * Returns the total price in cart of the user
   * @param {String} id
   * @returns {Number} total price
   */
  static async returnTotalPrice(id) {
    const items = await CartModel.find({ userId: id });
    let totalPrice = 0;
    items.map((item) => {
      totalPrice = totalPrice + item.sale_price * item.quantity;
    });
    return totalPrice;
  }

  /**
   * Function to clear cart of a particular user
   * @param {ObjectId} id
   */
  static async clearCart(id) {
    await CartModel.deleteMany({ userId: id });
  }

  /**
   * Function to delete an item from the cart of a user
   * @param {ObjectId} userId
   * @param {ObjectId} itemId
   */
  static async deleteItem(userId, itemId) {
    await CartModel.deleteOne({ userId: userId, _id: itemId });
  }

  /**
   * Function that checks if the book is left for a user to add in cart or not
   * @param {String} userId
   * @param {String} bookId
   * @returns {Boolean} whether book is left or not
   */
  static async compareQuantity(userId, bookId) {
    const book = await BookModel.findOne({ _id: bookId });
    const cartItem = await CartModel.findOne({
      userId: userId,
      bookId: bookId
    });

    let res;
    if (cartItem != null) {
      if (cartItem.quantity < book.quantity) {
        res = true;
      } else {
        res = false;
      }
    } else {
      res = true;
    }

    return res;
  }

  /**
   * Returns the quantities of book in cart model and book in books model
   * @param {String} userId
   * @param {String} itemId
   * @param {String} bookId
   * @returns {Array} of quantities
   */
  static async getQuantities(userId, itemId, bookId) {
    try {
      const cartItem = await CartModel.findOne({ userId: userId, _id: itemId });
      const book = await BookModel.findOne({ _id: bookId });
      if (cartItem && book) {
        return [cartItem.quantity, book.quantity];
      } else {
        return [null, null];
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Update the cart and books collection after checkout
   * @param {String} userId
   */
  static async checkout(userId) {
    try {
      const cartItems = await CartModel.find({ userId: userId, status: "Available" });

      await cartItems.map(async (item) => {

        // Find the book in the books collection
        const originalBook = await BookModel.findOne({ _id: item.bookId });

        // Take out its quantity
        const originalBookQuantity = originalBook.quantity;

        // Update the quantity of book in the books collection
        await BookService.updateQuantities(item.bookId, item.quantity);

        // Now update the quantities of the book in everyone's cart
        await this.updateQuantities(item,userId,originalBookQuantity);
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Updates the quantities of book in everyone's cart
   * @param {Object} item 
   * @param {String} userId 
   * @param {Number} originalBookQuantity 
   */
  static async updateQuantities(item,userId,originalBookQuantity){

    // All the books in cart with bookId as item.bookId
    const booksInCart = await CartModel.find( {bookId: item.bookId} );

    // Updating the quantities of books in cart
    await booksInCart.map(async (book)=>{
      let cartItem = await CartModel.findOne({ _id: book._id});
      if(cartItem.userId!==userId){

        // If someone purchased more amount of books than the amount present in someone's cart 
        // Example: If someone purchased 10 books, and a guy has just 5 books in his cart 

        if(originalBookQuantity - item.quantity === 0){
          cartItem.status  = "Sold out";
        } else if(originalBookQuantity - item.quantity < cartItem.quantity){
          cartItem.quantity = originalBookQuantity - item.quantity;
        }

        cartItem.save();
      }
    });
  }

  /**
   * Increment the quantity of item in the cart
   * @param {String} userId
   * @param {String} itemId
   */
  static async incrementQuantity(userId, itemId) {
    let cartItem = await CartModel.findOne({ _id: itemId, userId: userId });
    cartItem.quantity += 1;
    await cartItem.save();

    return cartItem;
  }

  /**
   * Decrement the quantity of item in the cart
   * @param {String} userId
   * @param {String} itemId
   */
  static async decrementQuantity(userId, itemId) {
    let cartItem = await CartModel.findOne({ _id: itemId, userId: userId });
    cartItem.quantity -= 1;
    await cartItem.save();

    return cartItem;
  }

  /**
   * Returns count of cart items for an user
   * @param {String} userId 
   * @returns {Integer} count of cart items of an user
   */
  static async countCartItems(userId){
    const count = await CartModel.count({ userId: userId });
    return count;
  }

  /**
   * Sends email to admin and user on checkout by email service
   * @param {Object} body 
   * @returns a status message for email
   */
  static async sendMails(body) {
    const userEmail = body.email;
    const name = body.name;

    // Find the cart items of the user
    const cartItems = await CartModel.find(
      { userId: body.userId },
      { _id: 0, title: 1, author: 1, quantity: 1, sale_price: 1, status: 1 }
    );

    let tableData = [];

    // Creates the data array of objects with cart items
    cartItems.map((item) => {
      const obj = {
        Title: item.title,
        Author: item.author,
        Quantity: item.quantity,
        Price: item.sale_price
      };

      if(item.status=="Available"){
        tableData.push(obj);
      }
    });

    const userSubject = "Your Purchase on the Book App";
    const adminSubject = "Someone made a purchase";

    let result;

    // Css styling for the html templates
    const style = EmailStyle.returnStyle();

    // Table template for the html content
    const tableTemplate = `
        ${tableData.map(item => `
        <tr>
        <td>${item.Title}</td>
        <td>${item.Author}</td>
        <td>${item.Quantity}</td>
        <td>${item.Price}</td>
        </tr>
        `).join("")}
    `;
    
    const userEmailTemplate = `
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
              Hi ${name},
          </h3>
          <p>
            Your Order Placed
          </p>
          <div>
              <span class="cartTotal">Purchase Amount: Rs. ${body.totalPrice}</span>
          </div>
          <table class="table-responsive">
            <thead>
            <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            </tr>
            </thead>
            <tbody>
            ${tableTemplate}
            </tbody>
          </table>
          <p>Thank you for the purchase. You will receive a payment link shortly.</p>
          <p class="mb-0">Yours Truly,</p>
          <p>Book App</p>
      </div>
      <footer class="footer">
          <div class="container">
              <span class="text-muted">© 2023 Book App. All rights reserved.</span>
          </div>
      </footer>
    </body>`

    const userEmailObj = {
      userEmail: userEmail,
      subject: userSubject,
      html: userEmailTemplate,
      name: "Book App"
    };

    result = await EmailService.sendEmail(userEmailObj);

    const adminEmailTemplate = `
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
                ${name} (${userEmail}) placed an order of Rs. ${body.totalPrice}
            </p>
            <div>
                <span class="cartTotal">Purchase Amount: Rs. ${body.totalPrice}</span>
            </div>
            <table class="table-responsive">
            <thead>
            <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            </tr>
            </thead>
            <tbody>
                ${tableTemplate}
            </tbody>
            </table>
            <p>Purchase Successful</p>
            <p class="mb-0">Yours Truly,</p>
            <p>Book App</p>
        </div>
        <footer class="footer">
            <div class="container">
                <span class="text-muted">© 2023 Book App. All rights reserved.</span>
            </div>
        </footer>
    </body>`

    const adminEmailObj = {
      userEmail: process.env.EMAIL,
      subject: adminSubject,
      html: adminEmailTemplate,
      name: "Admin"
    };

    result = await EmailService.sendEmail(adminEmailObj);
    return result;
  }
}

module.exports = CartService;
