const { ObjectId } = require("mongodb");
const Cart = require("../database/Cart");

/**
 * Function to return a single item from cart of a particular user
 * @param {ObjectId} userId
 * @param {String} title
 * @returns {Object} the item from the cart collection
 */
const returnItem = async (userId, title) => {
  const item = await Cart.findOne({
    userId: userId,
    title: title,
  });

  return item;
};

/**
 * Function to update the quantity of item in the cart of the user
 * @param {Object} item - Object with details of the item
 * @returns {Object} the updated item
 */
const updateItemQuantity = async (item) => {
  await Cart.updateOne(
    { title: item.title, userId: item.userId },
    {
      $set: {
        quantity: item.quantity + 1,
        totalPrice: item.totalPrice + item.price,
      },
    }
  );
  return item;
};

/**
 * Function to add new item to the cart
 * @param {Object} body
 */
const addNewItem = async (body) => {
  let cartItem = new Cart({
    title: body.title,
    author: body.author,
    price: body.price,
    quantity: 1,
    totalPrice: body.price,
    userId: body.userId,
    userEmail: body.userEmail,
  });

  await cartItem.save();
};

/**
 * Function to return cart items of a user
 * @param {ObjectId} id
 * @returns {Array} cart items of a user
 */
const returnCartItems = async (id) => {
  let items = await Cart.find({ userId: id });
  return items;
};

/**
 * Function to clear cart of a particular user
 * @param {ObjectId} id
 */
const clearCart = async (id) => {
  await Cart.deleteMany({ userId: id });
};

/**
 * Function to clear the cart collection at once
 */
const clearCartModel = async () => {
  await Cart.deleteMany({});
};

/**
 * Function to delete an item from the cart of a user
 * @param {ObjectId} userId
 * @param {ObjectId} itemId
 */
const deleteItem = async (userId, itemId) => {
  await Cart.deleteOne({ userId: userId, _id: itemId });
};

module.exports = {
  returnItem,
  updateItemQuantity,
  addNewItem,
  returnCartItems,
  clearCart,
  clearCartModel,
  deleteItem,
};
