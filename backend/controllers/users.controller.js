const UserService = require("../services/user.service");

/**
 * Controller class for Users related operations.
 */
class UserController {
  /**
   * Retrieves the list of users from the database.
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} status code with a message if users list is found or not
   */
  static async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      if (!users) {
        return res.status(400).json({ message: "No users found" });
      }

      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  /**
   * Registers a new user in the database.
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} status code with a message or new user
   */
  static async register(req, res) {
    try {
      // Check if the user already exists or not
      const user = await UserService.findUserByUsername(req.body.username);

      // If user exists the return a message
      if (user) {
        return res.status(500).json({ message: "User already exists" });
      }

      // Else add the new user to the users collection
      else {
        const newUser = await UserService.registerUser(req.body);
        if (!newUser) {
          return res.status(500).json({ message: "No user added, some error" });
        }

        return res.status(201).json({ newUser });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  /**
   * Logs in a user using their credentials.
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} status code with a message if logged in successfully or not
   */
  static async login(req, res) {
    try {
      // First find the user in the users collection
      const user = await UserService.findUserByUsername(req.body.username);

      // If user does not exists then return 500 internal server error
      if (!user) {
        return res.status(500).json({ message: "Invalid User" });
      }

      // Else verify the user and his/her password
      else {
        const verified = UserService.verifyUser(
          req.body.password,
          user.password
        );
        if (verified) {
          return res.status(201).json({ user });
        } else {
          return res.status(501).json({ message: "Password mismatch" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Gets the number of donations made by a user.
   * @param {Object} req
   * @param {Object} res
   * @returns {Response} status code with a message
   */
  static async donations(req, res) {
    try {
      const donationsCount = await UserService.countDonations(req.params.id);
      return res.status(201).json({ donations: donationsCount });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  /**
   * Returns the user details
   * @param {Request} req
   * @param {Response} res
   */
  static async getUser(req, res) {
    try {
      const user = await UserService.getUserDetails(req.params.id);
      return res.status(201).json({ message: user });
    } catch (error) {
      return res.status(501).json({ message: "No user found" });
    }
  }

  /**
   * Registers google user at backend
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  static async registerGoogleUser(req, res) {
    try {
      // Check if the user already exists or not
      const user = await UserService.findUserByUsername(req.body.username);

      // If user exists the return a message
      if (user) {
        return res.status(201).json({ user: user });
      }

      // Else add the new user to the users collection
      else {
        const newUser = await UserService.registerUser(req.body);
        if (!newUser) {
          return res.status(500).json({ message: "No user added, some error" });
        }

        return res.status(201).json({ newUser });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

module.exports = UserController;
