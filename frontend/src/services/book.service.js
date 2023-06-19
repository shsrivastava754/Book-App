import axios from "axios";
import Cookies from "js-cookie";

/**
 * Utility class for handling book services
 */
class BookService{

  /**
 *
 * @param {String} title
 * @param {String} author
 * @param {Number} price
 * @param {String} description
 * @param {String} quantity
 * @param {Number} sale_price
 */
  async addBook(title, author, price, description, quantity, sale_price){
    let result;
  await axios.post(process.env.REACT_APP_API_URL, { title, author, price, description, quantity, sale_price, 
      donatedById: JSON.parse(Cookies.get('userToken'))._id, token: Cookies.get('token')
    })
    .then((res) => {
      if (res) {
        result = res;
      }
    });

  return result;
  }

  /**
 * Get data of a book from backend
 * @param {ObjectId} id
 * @returns
 */
  async getBookData (url) {
    let response = await axios.get(url,{
      params: {
        token: Cookies.get('token')
      }
    });
    return response;
  }

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
  async editBook (bookDetails,id) {
    const {author, description, price, quantity, sale_price, title, status } = bookDetails;
    let result;
    await axios
      .put(`${process.env.REACT_APP_API_URL}/${id}`, {
        author, description, price, quantity, sale_price, title, status, token: Cookies.get('token')
      })
      .then((res) => {
        if (res) {
          result = "Edited";
        }
      });
    return result;
  }

/**
 * Function to compare the quantity of books in cart and actual book quantity in database
 * @param {String} userId
 * @param {String} bookId
 * @returns
 */
  async compareBook (userId, bookId){
    try {
      let result;
      result = await axios.post(
        `${process.env.REACT_APP_API_URL}/cart/compareQuantity`,
        {
          userId: userId,
          bookId: bookId,
          token: Cookies.get('token')
        }
      );

      return result.data.result;
    } catch (error) {
      console.log(error);
    }
  }

/**
 * Request a book at backend to admin
 * @param {String} bookName
 * @param {String} author
 * @returns
 */
  async sendRequest (bookName, author) {
    let result;
    await axios
      .post(`${process.env.REACT_APP_API_URL}/books/requestBook`, {
        bookName: bookName,
        author: author,
        userId: JSON.parse(Cookies.get('userToken'))._id,
        token: Cookies.get('token')
      })
      .then((res) => {
        if (res) {
          result = res;
        }
      });

    return result;
  }

/**
 * Fetches books from backend according to pagination, searching and filtering
 * @param {Number} page 
 * @param {Number} limit 
 * @param {String} search 
 * @param {String} filter 
 * @returns {Promise<{booksCount, books}>} filtered books from backend
 */
  async getBooks (page, limit, search, filter) {
    const url = `${process.env.REACT_APP_API_URL}/books/getBooks`;
    return axios.post(url, {
      userId: JSON.parse(Cookies.get('userToken'))._id, page: page, limit: limit, 
      searchQuery: search, category: filter, token: Cookies.get('token')
    });
  }
}

export default new BookService();
