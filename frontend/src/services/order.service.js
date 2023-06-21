import axios from "axios";
import Cookies from "js-cookie";

/**
 * Utility class for handling book services
 */
class OrderService{

  /**
 * Get data of a book from backend
 * @param {ObjectId} id
 * @returns
 */
  async getBooks (id) {
    const url = `${process.env.REACT_APP_API_URL}/orders/${id}`
    let response = await axios.get(url,{
      params: {
        token: Cookies.get('token')
      }
    });
    return response;
  }
}

export default new OrderService();
