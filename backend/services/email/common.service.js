const nodemailer = require("nodemailer");

class CommonEmailService {
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
        from: emailObj.from,
        to: emailObj.userEmail,
        subject: emailObj.subject,
        html: emailObj.html
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

module.exports = CommonEmailService;