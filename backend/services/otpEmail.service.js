const nodemailer = require("nodemailer");

class OtpEmailService {
  /**
   * Sends an email with OTP to users
   * @param {Object} emailObj
   * emailObj : { name, user email, otp}
   * @returns {Object} response of the mail
   */
  static async sendEmail(emailObj) {
    try {
      // Provide email and password to the nodemailer
      const config = {
        service: "gmail",
        auth: {
          user: process.env.email,
          pass: process.env.password
        }
      };

      // Creates a transporter to transport the mail
      const transporter = nodemailer.createTransport(config);

      // Messages for the mail
      const message = {
        from: `Book App ${process.env.EMAIL}`,
        to: emailObj.userEmail,
        subject: "OTP Details for Book App",
        html: `<p>Dear ${emailObj.name},<br>Your One Time Password (OTP) for verification of your account is: <strong>${emailObj.otp}.</strong> <br>The OTP will be valid for 10 minutes only. Click on resend otp for a new OTP.<br><br> Regards,<br> Book App</p>`
      };

      let result;

      // Finally sends the mail to user
      await transporter
        .sendMail(message)
        .then(() => {
          result = "Success";
        })
        .catch((e) => {
          console.log(e);
          result = "Failure";
        });

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = OtpEmailService;