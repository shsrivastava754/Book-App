import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

/**
 * Utility class for handling User Services
 */
class UserService{
/**
 * Function to send request at backend for number of donations
 * @param {String} url
 * @returns {Number} the number of donations made by a user
 */
async getDonations(url) {
  const response = await axios.get(url, {
    params: {
      token: Cookies.get('token')
    }
  });
  return response;
};

/**
 * Get users based on pagination and filtering
 * @param {Number} page 
 * @param {Number} limit 
 * @param {String} search 
 * @returns {Promise<{users,usersCount}>}
 */
async getUsers(page,limit,search) {
  const url = `${process.env.REACT_APP_API_URL}/users/getUsers`;
  return ( await axios.post(url,{
    page: page, limit: limit, 
    searchQuery: search,
    token: Cookies.get('token')
  }));
};

// Fetch donations done by the user
async fetchDonations(userId){
  const url = `${process.env.REACT_APP_API_URL}/users/donations/${userId}`;
  return await axios.get(url,{
    params: {
      token: Cookies.get('token')
    }
  });
}

// Fetch donations done by the user
async fetchOrders(userId){
  const url = `${process.env.REACT_APP_API_URL}/users/orders/${userId}`;
  return await axios.get(url, {
    params: {
      token: Cookies.get('token')
    }
  });
}

// Fetch donations done by the user
async fetchAllOrders(page,limit,search){
  const url = `${process.env.REACT_APP_API_URL}/admin/orders/getOrders`;
  return await axios.get(url, {
    params: {
      token: Cookies.get('token'),
      page: page, limit: limit, searchQuery: search
    }
  });
}

/**
 * Sends Axios request to the backend for login
 * @param {String} username
 * @param {String} password
 * @returns
 */
async loginUser (username, password) {
  let res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
    username: username,
    password: password,
  });
  return res;
};

/**
 * Register new user to the backend database
 * @param {String} name
 * @param {String} username
 * @param {String} email
 * @param {String} password
 */
async registerUser (name, username, email, password) {
  try {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/register`, {
        name: name,
        email: email,
        username: username,
        password: password,
      })
      .then((res)=> (res = res.data));
    toast.success("Registered new user");
  } catch (error) {
    toast.error("User already exists");
  }
};

/**
 * Fetches user details
 * @param {String} url 
 * @returns response from backend after fetching user details
 */
async getUser (url){
  const response = await axios.get(url,{
    params: 
    {
      token: Cookies.get('token')
    }
  });
  return response;
}

/**
 * Post google user to backend
 * @param {Object} userObj
 */
async postGoogleUser (userObj) {
  try {
    let res = await axios
      .post(`${process.env.REACT_APP_API_URL}/registerGoogleUser`, userObj)
      .then((res) => (res = res.data));
    return res;
  } catch (error) {
    toast.error("User already exists");
  }
};

/**
 * Gets the profile of user
 * @param {String} id 
 * @returns {Object} Details of the user
 */
async getUserProfile(id) {
  try {
    return await axios
    .get(`${process.env.REACT_APP_API_URL}/users/${id}`,{
      params: {
        token: Cookies.get('token')
      }
    })
    .then((res)=> res.data);
  } catch (error) {
    console.log(error);
  }
};

};

export default new UserService();