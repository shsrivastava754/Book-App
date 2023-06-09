const nodemailer = require("nodemailer");

class EmailService {
  /**
   * Sends an email to users
   * @param {Object} emailObj
   * emailObj : { subject, html template, 
   * user email}
   * @returns
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
        from: `${emailObj.name} ${process.env.EMAIL}`,
        to: emailObj.userEmail,
        subject: emailObj.subject,
        // html: mail,
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

module.exports = EmailService;
