const OrderService = require("../services/order.service");
const CartService = require("../services/cart.service");

/**
 * Controller class for Orders related operations.
 */
class OrderController {
  /**
   * Retrieves the list of orders from the database.
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} status code with a message if orders list is found or not
   * */

  static async getUserOrders (req,res){
    try {
        const orders = await OrderService.getUserOrders(req.params.id);
        if (!orders) {
          return res.status(401).json({ message: "No orders found" });
        } else {
          return res.status(200).json({ orders: orders });
        }
      } catch (error) {
        console.log(error);
        return res.status(401).json({error: error})
      }
  }

  /**
   * Adds an order to the order collection
   * @param {Object} req 
   * @param {Response} res 
   * @returns {Object} an object of the new order
   */
  static async addOrder (req,res){
    try{
      let quantity = await CartService.countCartItems(req.body.userId);
      req.body.quantity = quantity;
      let newOrder = OrderService.addOrder(req.body);
      
      return res.status(201).json({ newOrder });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Not able to add order" });
    }
  }

  /**
   * Returns the count of orders by user
   * @param {Object} req 
   * @param {Object} res 
   * @returns {Integer} the count of orders by the user
   */
  static async ordersCount (req,res){
    try {
      let ordersCount = await OrderService.ordersCount(req.body.userId);
      return res.status(201).json({ ordersCount });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Not able to find count of orders" });
    }
  }
};

module.exports = OrderController;
