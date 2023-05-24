const CartService = require("../services/cart.service");
const EmailService = require("../services/email.service");

/**
 * Controller class for handling operations related to the user cart
 */
class CartController {
  /**
   * Adding a book to cart
   * @param {Object} req
   * @param {Object} res - Response generated by the function
   * @returns {Response} status code with a message if the book has been added to cart or not
   */
  static async addToCart(req, res) {
    try {
      let cartItem;
      // First check if item already exists or not in the cart
      const item = await CartService.returnItem(
        req.body.userId,
        req.body.bookId
      );

      // If it exists in the collection, then just update the quantity
      if (item) {
        cartItem = await CartService.updateItemQuantity(item);
      }

      // Else add new item to the collection
      else {
        cartItem = await CartService.addNewItem(req.body);
      }

      if (!cartItem) {
        return res.status(500).json({ message: "Not added to cart" });
      }

      return res.status(201).json({ cartItem });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  /**
   * Function to get all items present in the cart of a particular user
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} cart items of the user
   */
  static async getCartItems(req, res) {
    try {
      const items = await CartService.returnCartItems(req.body.id);
      const totalPrice = await CartService.returnTotalPrice(req.body.id);
      if (!items) {
        return res.status(400).json({ message: "No cart items" });
      }

      return res.status(200).json({ items: items, totalPrice: totalPrice });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  }

  /**
   * Function to clear the cart of a particular user
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} status code with a success message or error message
   */
  static async clearCart(req, res) {
    try {
      await CartService.clearCart(req.body.userId);
      return res.status(201).json({ message: "Deleted cart items" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  /**
   * Function to delete item from the cart of the user
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} a status code if the item is deleted from the cart or not
   */
  static async deleteItem(req, res) {
    try {
      await CartService.deleteItem(req.params.userId, req.params.itemId);
      return res.status(201).json({ message: "Deleted cart model item" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  /**
   * Compares the quantities of books in cart and books collection
   * @param {Request} req
   * @param {Response} res
   */
  static async compareQuantity(req, res) {
    const result = await CartService.compareCartQuantity(
      req.body.userId,
      req.body.bookId
    );
    return res.status(201).json({ result: result });
  }

  /**
   * To get the quantities of book in cart and books model
   * @param {Request} req
   * @param {Response} res
   * @returns quantity of book in books model and cart model
   */
  static async getQuantities(req, res) {
    try {
      const result = await CartService.returnQuantities(
        req.params.userId,
        req.params.itemId,
        req.params.bookId
      );
      return res
        .status(201)
        .json({ cartQuantity: result[0], bookQuantity: result[1] });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function to complete the shopping of the user
   * @param {Request} req
   * @param {Response} res
   * @returns Response status
   */
  static async checkout(req, res) {
    const result = await CartService.checkoutUser(req.body.userId);
    return res.status(201).json({ result: result });
  }

  /**
   * Increment the quantity of item in the cart
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  static async changeQuantity(req, res) {
    let result;
    if (req.body.action === "increment") {
      result = await CartService.incrementQuantity(
        req.params.userId,
        req.params.itemId
      );
    } else {
      result = await CartService.decrementQuantity(
        req.params.userId,
        req.params.itemId
      );
    }
    return res
      .status(201)
      .json({ quantity: result.quantity, sale_price: result.sale_price });
  }

  /**
   * Send an email to admin informing the purchase of user
   * @param {Request} req
   * @param {Response} res
   */
  static async informAdmin(req, res) {
    const result = await CartService.sendEmailOnCheckout(req.body);
    res.status(201).json({ result });
  }
}

module.exports = CartController;
