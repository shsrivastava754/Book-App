import axios from "axios";
import { toast } from "react-toastify";

/**
 * Function to show notification in case of adding an item to cart
 */
const showToast = () => {
  toast.success("Added to cart");
};

/**
 * Function to show error notification in case of failure in addition to cart
 */
const showerrorToast = () => {
  toast.warning("Failed to add to cart");
};

/**
 * Get cart items of an user
 * @param {String} url 
 * @returns response from backend
 */
export const getCartItems = async(url)=>{
  const response = await axios
    .post(url, {
      id: JSON.parse(localStorage.getItem("user"))._id,
    });

    return response;
}

/**
 * 
 * @returns {Number} count of cart items for an user
 */
export const getCartCount = async()=>{
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/cart/getCartCount`,{userId: JSON.parse(localStorage.getItem("user"))._id});
  return response.data.cartCount;
}

/**
 * Post book details to cart collection
 * @param {Object} book
 */
export const postToCart = async (book) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/cart/addToCart`, {
      title: book.title,
      price: book.price,
      author: book.author,
      bookId: book._id,
      sale_price: book.sale_price,
      userId: JSON.parse(localStorage.getItem("user"))._id,
      userEmail: JSON.parse(localStorage.getItem("user")).email,
    })
    .then((res) => {
      if (res) {
        showToast();
      } else {
        showerrorToast();
      }
    });
};

/**
 * Deletes an item from the cart of a user
 * @param {ObjectId} id
 */
export const deleteCartItem = async (id) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
  window.location.reload();
};

/**
 * Clear cart API called at backend
 */
export const clearCartService = async () => {
  axios.post(`${process.env.REACT_APP_API_URL}/cart/clearCart`, {
    userId: JSON.parse(localStorage.getItem("user"))._id,
    userEmail: JSON.parse(localStorage.getItem("user")).email,
  });
  window.location.reload();
};

/**
 * Removes a single item from cart
 * @param {ObjectId} itemId
 * @param {ObjectId} userId
 */
export const removeCartItem = async (itemId, userId) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/cart/${itemId}/${userId}`);
  window.location.reload();
};

/**
 * Service for checking out
 * @returns result after the checkout
 */
export const checkoutService = async (totalPrice) => {
  try {
    let user = JSON.parse(localStorage.getItem("user"));
    await axios.post(`${process.env.REACT_APP_API_URL}/cart/sendEmail`, {
      email: user.email,
      userId: user._id,
      totalPrice: totalPrice,
      name: user.name,
    });
    let qtyResult;
    qtyResult = await axios.post(
      `${process.env.REACT_APP_API_URL}/cart/checkout`,
      {
        userId: user._id,
      }
    );

    return qtyResult;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Increments the quantity at the backend
 * @param {String} itemId
 */
export const incrementQuantity = async (itemId) => {
  try {
    let userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await axios.put(
      `${process.env.REACT_APP_API_URL}/cart/updateQuantity/${userId}/${itemId}`,
      { action: "increment" }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Increments the quantity at the backend
 * @param {String} itemId
 */
export const decrementQuantity = async (itemId) => {
  try {
    let userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await axios.put(
      `${process.env.REACT_APP_API_URL}/cart/updateQuantity/${userId}/${itemId}`,
      { action: "decrement" }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get the quantities of book in cart and books model from backend
 * @param {String} itemId
 * @param {String} bookId
 */
export const getQuantities = async (itemId, bookId) => {
  try {
    let result;
    result = await axios.get(
      `${process.env.REACT_APP_API_URL}/cart/getQuantities/${
        JSON.parse(localStorage.getItem("user"))._id
      }/${itemId}/${bookId}`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
