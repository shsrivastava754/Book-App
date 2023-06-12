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

  static async getUsers(skip, limit, searchQuery) {
    try {
      const users = await UserModel.find(
      {
        $or: [
          { username: { $regex: searchQuery, $options: "i" } },
          { name: { $regex: searchQuery, $options: "i" } },
        ]
      }).sort({ _id: -1 }).skip(skip).limit(limit);

      return users;
    } catch (error) {
      console.log(error);
    }
  }

  static async countUsers() {
    const usersCount = await UserModel.countDocuments();
    return usersCount;
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
    body.password = hashedPass;
    body.role = "User";
    let newUser = new UserModel(body);

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
   * 
   * @param {String} id 
   * @returns {Object} donations done by the user
   */
  static async getDonations(id) {
    const donations = await BookModel.find({ donatedById: id });
    return donations;
  }
  /**
   * Get details of a user from collection
   * @param {String} id
   * @returns
   */
  static async getUser(id) {
    const user = await UserModel.findOne({ _id: id });
    return user;
  }

  /**
   * Finds user by his id from the users collection
   * @param {String} id
   * @returns a user object
   */
  static async findUserById(id) {
    let user = await UserModel.findOne({ _id: id });
    return user;
  }
}

module.exports = UsersService;
