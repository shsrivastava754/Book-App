const User = require("../database/schema/user.schema");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
    createDefaultUser();
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const createDefaultUser = async () => {
  try {
    let saltRounds = 10;
    let hashedPass = bcrypt.hashSync("admin2023", saltRounds);
    const defaultUser = new User({
      name: "Admin",
      username: "admin2023",
      email: process.env.EMAIL,
      password: hashedPass,
      role: "Admin",
      isVerified: true,
    });

    await defaultUser.save();
    console.log("Default user created");
    mongoose.disconnect();
  } catch (error) {
    console.error("Failed to create default user:", error);
    mongoose.disconnect();
  }
};