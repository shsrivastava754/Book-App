import axios from "axios";
import { toast } from "react-toastify";

/**
 * Function to send request at backend for number of donations
 * @param {String} url
 * @returns {Number} the number of donations made by a user
 */
export const getDonations = async (url) => {
  return await axios.get(url).then((res) => res.data);
};

/**
 * Returns the list of users in collection
 * @param {String} url
 * @returns {Array} - List of users
 */
export const getUsers = async (url) => {
  return await axios.get(url).then((res) => res.data);
};

/**
 *
 * @param {String} title
 * @param {String} author
 * @param {String} price
 * @param {String} description
 * @param {String} quantity
 */
export const postBook = async (title, author, price, description, quantity) => {
  let result;
  await axios
    .post(process.env.REACT_APP_API_URL, {
      title: title,
      author: author,
      price: price,
      description: description,
      quantity: quantity,
      donatedById: JSON.parse(localStorage.getItem("user"))["_id"],
    })
    .then((res) => {
      if (res) {
        result = res;
      }
    });

  return result;
};

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
 * Post book details to cart collection
 * @param {Object} book
 */
export const postToCart = async (book) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/cart/addToCart`, {
      title: book.title,
      price: book.price,
      author: book.author,
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
 * Get data of a book from backend
 * @param {ObjectId} id 
 * @returns 
 */
export const getBookData = async (id) => {
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/:${id}`);
    return response;
};

/**
 * Edit book details at backend
 * @param {String} title 
 * @param {String} author 
 * @param {Number} price 
 * @param {String} description 
 * @param {String} status 
 * @param {Number} quantity 
 * @param {ObjectId} id 
 * @returns {String} a response message
 */
export const editBookDetails = async(title,author,price,description,status,quantity,id)=>{
    let result;
    await axios.put(`${process.env.REACT_APP_API_URL}/${id}`,{
        title: title,
        author: author,
        price: price,
        description: description,
        status: status,
        quantity: quantity
    }).then((res)=>{
        if(res){
            result = "Edited";
        }
    });
    return result;
}

/**
 * Clear cart API called at backend
 */
export const clearCartService = async ()=>{
    axios.post(`${process.env.REACT_APP_API_URL}/cart/clearCart`,{
        userId: JSON.parse(localStorage.getItem("user"))._id,
        userEmail: JSON.parse(localStorage.getItem("user")).email
    });
    window.location.reload();
}

/**
 * Removes a single item from cart
 * @param {ObjectId} itemId 
 * @param {ObjectId} userId 
 */
export const removeCartItem = async(itemId,userId)=>{
    axios.delete(`${process.env.REACT_APP_API_URL}/cart/${itemId}/${userId}`);
    window.location.reload();
};

/**
 * Function for login with google ID
 * @returns {Response} response from the axios request
 */
export const googleLogin = async()=>{
    let result = await axios.get(
        `${process.env.REACT_APP_API_URL}/getUserData/returnLocalstorage`
    );
    return result;
}

/**
 * Sends Axios request to the backend for login
 * @param {String} username 
 * @param {String} password 
 * @returns 
 */
export const loginUserRequest = async (username,password)=>{
    let res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username: username,
        password: password,
    });
    return res;
};

export const postUser = async(name,username,email,password)=>{
    try{
        await axios
        .post(`${process.env.REACT_APP_API_URL}/register`, {
            name: name,
            email: email,
            username: username,
            password: password,
        })
        .then((res) => res = res.data);
        toast.success("Registered new user");
    } catch (error){
        toast.error("User already exists");
    }
};

export const checkoutService = async()=>{

};

export const compareQuantity = async(userId, bookId)=>{
    try{
        let result;
        result = await axios
        .post(`${process.env.REACT_APP_API_URL}/cart/compareQuantity`, {
            userId: userId,
            bookId: bookId
        });

        return result.data.result;
    } catch (error){
        console.log(error);
    }
};

