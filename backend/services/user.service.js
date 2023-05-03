const UserModel = require("../database/schema/user.schema");
const BookModel = require("../database/schema/book.schema");
const bcrypt = require("bcrypt");

/**
 * Class for users service
 */
class UsersService {
  /**
   *
   * @returns {Array} list of all users in the users collection
   */
  static async getUsers() {
    const users = await UserModel.find();
    return users;
  }

  /**
   * Function to return a user from collection
   * @param {String} username
   * @returns {Object} user
   */
  static async findUserByUsername(username) {
    const user = await UserModel.findOne({ username: username });
    return user;
  }

  /**
   * Function to register a new user
   * @param {Object} body
   * @returns {Object} an object of the added user
   */
  static async registerUser(body) {
    let saltRounds = 10;
    let hashedPass = bcrypt.hashSync(body.password, saltRounds);
    let newUser = new UserModel({
      name: body.name,
      username: body.username,
      password: hashedPass,
      email: body.email,
      role: "User",
    });

    await newUser.save();
    return newUser;
  }

  /**
   * Function to check if the user has entered correct password or not
   * @param {String} enteredPassword
   * @param {String} actualPassword
   * @returns {Boolean} a boolean value if password is right or not
   */
  static verifyUser(enteredPassword, actualPassword) {
    let verified = bcrypt.compareSync(enteredPassword, actualPassword);
    return verified;
  }

  /**
   * Function to count the number of donations done by a user
   * @param {ObjectId} id
   * @returns {Number} a value for the donations
   */
  static async countDonations(id) {
    const donationsCount = await BookModel.count({ donatedById: id });
    return donationsCount;
  }

  /**
   * Get details of a user from collection
   * @param {String} id
   * @returns
   */
  static async getUserDetails(id) {
    const user = await UserModel.findOne({ _id: id });
    return user;
  }
}

module.exports = UsersService;
