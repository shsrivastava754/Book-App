const mongoose = require("mongoose");

// This allows for more flexibility in querying the database, as queries can include fields that are not explicitly defined in the schema.
mongoose.set("strictQuery", false);

const OtpSchema = new mongoose.Schema({
  // OTP
  otp: {
    type: Number,
    required: true
  },

  // Name of the user
  email: {
    type: String,
    required: true,
  },

  // Id of the user
  userId: {
    type: String,
    required: true
  },

  // If the user if verified or not (true or false)
  isVerified: Boolean,

  // Time after which otp expires
  expirationTime: Date
  
},{ timestamps: true });

const Otp = new mongoose.model("Otp", OtpSchema);
module.exports = Otp;
