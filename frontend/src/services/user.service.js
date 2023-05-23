import axios from "axios";
import { toast } from "react-toastify";

/**
 * Function to send request at backend for number of donations
 * @param {String} url
 * @returns {Number} the number of donations made by a user
 */
export const getDonations = (url) => {
  const response = axios.get(url).then((res) => res.data);
  return response;
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
 * Function for login with google ID
 * @returns {Response} response from the axios request
 */
export const googleLogin = async () => {
  let result = await axios.get(
    `${process.env.REACT_APP_API_URL}/getUserData/returnLocalstorage`
  );
  return result;
};

/**
 * Sends Axios request to the backend for login
 * @param {String} username
 * @param {String} password
 * @returns
 */
export const loginUserRequest = async (username, password) => {
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
export const postUser = async (name, username, email, password) => {
  try {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/register`, {
        name: name,
        email: email,
        username: username,
        password: password,
      })
      .then((res) => (res = res.data));
    toast.success("Registered new user");
  } catch (error) {
    toast.error("User already exists");
  }
};

/**
 * Post google user to backend
 * @param {Object} userObj
 */
export const postGoogleUser = async (userObj) => {
  try {
    let res = await axios
      .post(`${process.env.REACT_APP_API_URL}/registerGoogleUser`, userObj)
      .then((res) => (res = res.data));
    return res;
  } catch (error) {
    toast.error("User already exists");
  }
};
