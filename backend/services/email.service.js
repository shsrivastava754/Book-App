const nodemailer = require("nodemailer");
const MailGen = require("mailgen");

class EmailService {
  /**
   * Sends an email to users
   * @param {Object} emailObj
   * emailObj : {intro, outro, tabledata, subject, product name, 
   * product link, name, user email}
   * @returns
   */
  static async sendEmail(emailObj) {
    try {
      // Provide email and password to the nodemailer
      const config = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      };

      // Creates a transporter to transport the mail
      const transporter = nodemailer.createTransport(config);

      // Creates an object of MailGen class
      const mailGenerator = new MailGen({
        theme: "default",
        product: {
          name: emailObj.productName,
          link: emailObj.productLink,
        },
      });

      // Response to be sent to the user
      const response = {
        body: {
          name: emailObj.name,
          intro: emailObj.intro,
          table: {
            data: emailObj.tableData,
          },
          outro: emailObj.outro,
        },
      };

      // Generates mail for user and admin
      const mail = mailGenerator.generate(response);

      // Messages for the mail
      const message = {
        from: process.env.EMAIL,
        to: emailObj.userEmail,
        subject: emailObj.subject,
        html: mail,
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
