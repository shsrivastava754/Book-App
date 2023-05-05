import axios from "axios";

/**
 *
 * @param {String} title
 * @param {String} author
 * @param {Number} price
 * @param {String} description
 * @param {String} quantity
 * @param {Number} sale_price
 */
export const postBook = async (
  title,
  author,
  price,
  description,
  quantity,
  sale_price
) => {
  let result;
  await axios
    .post(process.env.REACT_APP_API_URL, {
      title: title,
      author: author,
      price: price,
      description: description,
      quantity: quantity,
      sale_price: sale_price,
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
export const editBookDetails = async (
  title,
  author,
  price,
  description,
  status,
  quantity,
  id,
  sale_price
) => {
  let result;
  await axios
    .put(`${process.env.REACT_APP_API_URL}/${id}`, {
      title: title,
      author: author,
      price: price,
      description: description,
      status: status,
      quantity: quantity,
      sale_price: sale_price,
    })
    .then((res) => {
      if (res) {
        result = "Edited";
      }
    });
  return result;
};

/**
 * Function to compare the quantity of books in cart and actual book quantity in database
 * @param {String} userId
 * @param {String} bookId
 * @returns
 */
export const compareQuantity = async (userId, bookId) => {
  try {
    let result;
    result = await axios.post(
      `${process.env.REACT_APP_API_URL}/cart/compareQuantity`,
      {
        userId: userId,
        bookId: bookId
      }
    );

    return result.data.result;
  } catch (error) {
    console.log(error);
  }
};