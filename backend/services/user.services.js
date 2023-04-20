const Users = require("../database/Users");
const Books = require("../database/Books");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

/**
 *
 * @returns {Array} list of all users in the users collection
 */
const getUsers = async () => {
  const users = await Users.find();
  return users;
};

/**
 * Function to return a user from collection
 * @param {String} username
 * @returns {Object} user
 */
const findUserByUsername = async (username) => {
  const user = await Users.findOne({ username: username });
  return user;
};

/**
 * Function to register a new user
 * @param {Object} body
 * @returns {Object} an object of the added user
 */
const registerUser = async (body) => {
  let saltRounds = 10;
  let hashedPass = bcrypt.hashSync(body.password, saltRounds);
  let newUser = new Users({
    name: body.name,
    username: body.username,
    password: hashedPass,
    email: body.email,
    role: "User",
  });

  await newUser.save();
  return newUser;
};

/**
 * Function to check if the user has entered correct password or not
 * @param {String} enteredPassword
 * @param {String} actualPassword
 * @returns {Boolean} a boolean value if password is right or not
 */
const verifyUser = (enteredPassword, actualPassword) => {
  let verified = bcrypt.compareSync(enteredPassword, actualPassword);
  return verified;
};

/**
 * Function to count the number of donations done by a user
 * @param {ObjectId} id
 * @returns {Number} a value for the donations
 */
const countDonations = async (id) => {
  const donationsCount = await Books.count({ donatedById: id });
  return donationsCount;
};

module.exports = {
  getUsers,
  findUserByUsername,
  registerUser,
  verifyUser,
  countDonations,
};
