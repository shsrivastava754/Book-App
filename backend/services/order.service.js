const OrderModel = require("../database/schema/order.schema");
const CartModel = require("../database/schema/cart.schema");
const PurchasedBooksModel = require("../database/schema/purchased_books.schema");

/**
 * Class for order service
 */
class OrderService {
  /**
   * Gets orders placed by an user
   * @returns {Array} 
   */

  static async getUserOrders(userId) {
    try {
      const orders = await OrderModel.find({userId: userId});

      return orders;
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * Returns orders list according to the applied filter
   * @param {Integer} skip 
   * @param {Integer} limit 
   * @param {String} searchQuery 
   * @returns {Array} array of orders as per filter
   */
  static async getOrders(skip, limit, searchQuery) {
    try {
      const orders = await OrderModel.find(
      {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } }
        ]
      }).sort({ _id: -1 }).skip(skip).limit(limit);

      return orders;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Adds a book to the purchased books collection
   * @param {Object} book 
   * @param {String} orderId 
   * @returns added book to the purchased books model
   */
  static async addBook(book,orderId){
    let purchased_book = {
      title: book.title,
      bookId: book.bookId,
      author: book.author,
      quantity: book.quantity,
      sale_price: book.sale_price,
      userId: book.userId,
      userEmail: book.userEmail,
      orderId
    };
    const purchasedBook = new PurchasedBooksModel(purchased_book);

    await purchasedBook.save();
    return purchasedBook;
  }
  
  /**
   * Adds an order to the order collection
   * @param {Object} body 
   * @returns {Object} added new order
   */
  static async addOrder(body){
    body.status = "Placed";
    const newOrder = new OrderModel(body);

    await newOrder.save();

    const cartItems = await CartModel.find({ userId: body.userId });
    await cartItems.map(async (item) => {
      // Update the quantity of each book in the books collection
      await this.addBook(item,newOrder._id);
    });

    return newOrder;
  }

  /**
   * Returns the count of orders of an user
   * @param {String} userId 
   * @returns {Integer} the count of orders placed by the user
   */
  static async ordersCount(userId){
    const count = await OrderModel.countDocuments({userId});
    return count;
  }

  // Count all the orders in the orders model
  static async countOrders() {
    const count = await OrderModel.countDocuments();
    return count;
  }

}

module.exports = OrderService;
