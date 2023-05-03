const mongoose = require("mongoose");

// Disabling strict mode for queries, mongoose will execute queries that contain undefined properties
mongoose.set("strictQuery", false);

const uri = process.env.MONGO_URI;

/**
 * A utility class that provides a static method to connect to a MongoDB database using Mongoose.
 */
class DbUtil {
  /**
   * Establishes a connection to a MongoDB database using Mongoose.
   */
  static connect() {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = DbUtil;
