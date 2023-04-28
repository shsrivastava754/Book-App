const Cart = require("../database/Cart");
const Books = require("../database/Books");
const Users = require("../database/Users");
const BookService = require("./book.service");

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
    const item = await Cart.findOne({
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
    await Cart.updateOne(
      { bookId: item.bookId, userId: item.userId },
      {
        $set: {
          quantity: item.quantity + 1,
          totalPrice: item.totalPrice + item.price,
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
    let cartItem = new Cart({
      title: body.title,
      bookId: body.bookId,
      author: body.author,
      price: body.price,
      quantity: 1,
      totalPrice: body.price,
      userId: body.userId,
      userEmail: body.userEmail,
    });

    await cartItem.save();
  }

  /**
   * Function to return cart items of a user
   * @param {ObjectId} id
   * @returns {Array} cart items of a user
   */
  static async returnCartItems(id) {
    let items = await Cart.find({ userId: id });
    return items;
  }

  /**
   * Function to clear cart of a particular user
   * @param {ObjectId} id
   */
  static async clearCart(id) {
    await Cart.deleteMany({ userId: id });
  }

  /**
   * Function to clear the cart collection at once
   */
  static async clearCartModel() {
    await Cart.deleteMany({});
  }

  /**
   * Function to delete an item from the cart of a user
   * @param {ObjectId} userId
   * @param {ObjectId} itemId
   */
  static async deleteItem(userId, itemId) {
    await Cart.deleteOne({ userId: userId, _id: itemId });
  }

  /**
   * Function that checks if the book is left for a user to add in cart or not
   * @param {String} userId
   * @param {String} bookId
   * @returns {Boolean} whether book is left or not
   */
  static async compareCartQuantity(userId, bookId) {
    const book = await Books.findOne({ _id: bookId });
    const cartItem = await Cart.findOne({ userId: userId, bookId: book.bookId });
    let res;
    if (cartItem != null) {
      if (cartItem.quantity + 1 < book.quantity) {
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
   * Update the cart and books collection after checkout
   * @param {String} userId 
   */
  static async checkoutUser(userId){
    let cartItems = await Cart.find({userId:userId});
    cartItems.map(async (item)=>{

      // Update the quantity of each book in the books collection
      await BookService.updateQuantities(item.bookId,item.quantity);
    });

    this.clearCart(userId);
  }
}

module.exports = CartService;
