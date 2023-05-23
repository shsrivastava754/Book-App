const CartModel = require("../database/schema/cart.schema");
const BookModel = require("../database/schema/book.schema");
const BookService = require("./book.service");
const EmailService = require("./email.service");

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
  static async addNewItem(body) {
    let cartItem = new CartModel({
      title: body.title,
      bookId: body.bookId,
      author: body.author,
      price: body.price,
      sale_price: body.sale_price,
      quantity: 1,
      userId: body.userId,
      userEmail: body.userEmail,
    });

    await cartItem.save();
    return cartItem;
  }

  /**
   * Function to return cart items of a user
   * @param {ObjectId} id
   * @returns {Array} cart items of a user
   */
  static async returnCartItems(id) {
    let items = await CartModel.find({ userId: id });
    return items;
  }

  /**
   * Returns the total price in cart of the user
   * @param {String} id
   * @returns {Number} total price
   */
  static async returnTotalPrice(id) {
    let items = await CartModel.find({ userId: id });
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
  static async compareCartQuantity(userId, bookId) {
    const book = await BookModel.findOne({ _id: bookId });
    const cartItem = await CartModel.findOne({
      userId: userId,
      bookId: bookId,
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
  static async returnQuantities(userId, itemId, bookId) {
    try {
      let cartItem = await CartModel.findOne({ userId: userId, _id: itemId });
      let book = await BookModel.findOne({ _id: bookId });
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
  static async checkoutUser(userId) {
    let cartItems = await CartModel.find({ userId: userId });
    await cartItems.map(async (item) => {
      // Update the quantity of each book in the books collection
      await BookService.updateQuantities(item.bookId, item.quantity);
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
   * Sends email to admin and user on checkout by email service
   * @param {Object} body 
   * @returns a status message for email
   */
  static async sendEmailOnCheckout(body) {
    let userEmail = body.email;
    let name = body.name;

    // Find the cart items of the user
    let cartItems = await CartModel.find(
      { userId: body.userId },
      { _id: 0, title: 1, author: 1, quantity: 1, sale_price: 1 }
    );

    let productName = "Book App";
    let productLink = "https://mailgen.js/";

    let tableData = [];

    // Creates the data array of objects with cart items
    cartItems.map((item) => {
      let obj = {
        Title: item.title,
        Author: item.author,
        Quantity: item.quantity,
        Price: item.sale_price,
      };
      tableData.push(obj);
    });

    let userIntro = "Your Order Placed";
    let userOutro = `Thank you for the purchase. \n\n Total price: Rs. ${body.totalPrice}.\n\n You will receive your books shortly.`;

    let adminIntro = `${name} (${userEmail}) placed an order of Rs. ${body.totalPrice}`;
    let adminOutro = "Purchase Successful";

    let userSubject = "Your Purchase on the Book App";
    let adminSubject = "Someone made a purchase";

    let result;

    let userEmailObj = {
      userEmail: userEmail,
      name: name,
      productName: productName,
      productLink: productLink,
      intro: userIntro,
      outro: userOutro,
      tableData: tableData,
      subject: userSubject,
    };
    result = await EmailService.sendEmail(userEmailObj);

    let adminEmailObj = {
      userEmail: process.env.EMAIL,
      name: "Admin",
      productName: productName,
      productLink: productLink,
      intro: adminIntro,
      outro: adminOutro,
      tableData: tableData,
      subject: adminSubject,
    };

    result = await EmailService.sendEmail(adminEmailObj);
    return result;
  }
}

module.exports = CartService;
