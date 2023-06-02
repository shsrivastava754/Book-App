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
export const getBookData = async (url) => {
  let response = await axios.get(url);
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
        bookId: bookId,
      }
    );

    return result.data.result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Request a book at backend to admin
 * @param {String} bookName
 * @param {String} author
 * @returns
 */
export const requestBook = async (bookName, author) => {
  let result;
  await axios
    .post(`${process.env.REACT_APP_API_URL}/books/requestBook`, {
      bookName: bookName,
      author: author,
      userId: JSON.parse(localStorage.getItem("user"))["_id"],
    })
    .then((res) => {
      if (res) {
        result = res;
      }
    });

  return result;
};

/**
 * Fetches books from backend according to pagination, searching and filtering
 * @param {Number} page 
 * @param {Number} limit 
 * @param {String} search 
 * @param {String} filter 
 * @returns filtered books from backend
 */
export const fetchBooks = async (page, limit, search, filter) => {
  const url = `${process.env.REACT_APP_API_URL}/books/getBooks`;
  const response = await axios.post(url, {
    userId: JSON.parse(localStorage.getItem("user"))._id,
    page: page,
    limit: limit,
    searchQuery: search,
    category: filter
  });

  return response;
};
