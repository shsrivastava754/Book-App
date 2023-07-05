const UserModel = require("../database/schema/user.schema");
const BookModel = require("../database/schema/book.schema");
const OtpModel = require("../database/schema/otp.schema");
const bcrypt = require("bcrypt");
const OtpEmailService = require("./email/otpEmail.service");

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

  /**
   * Number of users according to the filter
   * @param {String} searchQuery 
   * @returns {Integer} count of users
   */
  static async countUsers(searchQuery) {
    let count;
    if(searchQuery==""){
      count = await UserModel.countDocuments();
    } else {
      count = await UserModel.countDocuments({
        $or: [
                { name: { $regex: searchQuery, $options: "i" } }
              ]
    });
    }
    return count;
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
    if(body.isVerified===undefined){
      body.isVerified = false
    }
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

  static async userVerified(id){
    const user = await UserModel.findByIdAndUpdate(id, {
      isVerified: true
    });
    user.save();
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

  /**
   * Edits the address of user
   * @param {Object} address 
   * @param {String} id 
   * @returns {Object} Details of the user
   */
  static async addAddress(address,id){
    const user = await UserModel.findByIdAndUpdate(id, {
      address: address
    });

    user.save();
    return user;
  }

  /**
   * Returns address of the user
   * @param {String} id 
   * @returns {Object} address of the user
   */
  static async getAddress(id){
    const user = await UserModel.findOne({_id:id});
    return user.address;
  }

  /**
   * Sends the otp to the mail
   * @param {Object} user 
   * @returns {Object} the new otp document created in the otp collection
   */
  static async sendOtp(user){
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expirationTime = Date.now() + 600000;

    await OtpModel.deleteMany({userId:user._id});

    const emailObj = {
      name: user.name,
      userEmail: user.email,
      otp
    };

    const mailMessage = await OtpEmailService.sendEmail(emailObj);

    const newOtp = new OtpModel({
      email: user.email,
      otp,
      userId: user._id,
      expirationTime,
      isVerified: false
    });

    await newOtp.save();
    return newOtp;
  }

  /**
   * Verify the otp entered by the user
   * @param {String} id 
   * @param {Number} otp 
   * @returns {String} whether the otp is verified or not
   */
  static async verifyOtp(id,otp){
    const userOtp = await OtpModel.findOne({userId:id});
    const currentTime = Date.now();
    if(!userOtp || userOtp.expirationTime<currentTime){
      return 'Invalid or expired OTP';
    }

    if(userOtp.otp!==otp){
      return 'Incorrect OTP';
    }

    userOtp.verified = true;
    await userOtp.save();
    return 'Correct OTP';
  }
}

module.exports = UsersService;
