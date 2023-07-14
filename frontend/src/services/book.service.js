import axios from "axios";
import Cookies from "js-cookie";

/**
 * Utility class for handling book services
 */
class BookService{

  
  /**
   * Adding the book into the database
   * @param {Object} bookDetails 
   * @returns {Object} Result obtained from backend after adding book
   */
  async addBook(bookDetails){
    let result;
    await axios.post(process.env.REACT_APP_API_URL, { title: bookDetails.title, author: bookDetails.author, price: bookDetails.price, 
      description: bookDetails.description, quantity: bookDetails.quantity, sale_price: bookDetails.sale_price, 
        donatedById: JSON.parse(Cookies.get('userToken'))._id, token: Cookies.get('token')
      })
      .then((res) => {
        if (res) {
          result = res;
        }
      });

    console.log(result);

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
   * Editing the details of the book
   * @param {Object} bookDetails 
   * @param {String} id 
   * @returns {Object} Response from the backend
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
  async getBooks (filters) {
    const url = `${process.env.REACT_APP_API_URL}/books/getBooks`;
    return axios.post(url, {
      userId: JSON.parse(Cookies.get('userToken'))._id, page: filters.page, limit: filters.limit, 
      searchQuery: filters.search, category: filters.category, token: Cookies.get('token')
    });
  }
}

export default new BookService();
