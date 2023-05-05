const nodemailer = require("nodemailer");
const MailGen = require("mailgen");

const CartModel = require("../database/schema/cart.schema");
const UserModel = require("../database/schema/user.schema");

class EmailService {
  /**
   * Sends an email to the admin when user completes the purchase
   * @param {Object} body
   */
  static async sendEmailToUser(body) {
    try {
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world with shaannnn", // plain text body
        html: "<b>Hello world with Shaannnn</b>", // html body
      };

      let result;
      await transporter.sendMail(message).then((info) => {
        result = {
          msg: "You should receive an email",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        };
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Sends an email to the admin and user when user completes the purchase
   * @param {Object} body
   * @returns
   */
  static async sendEmailToAdmin(body) {
    try {
      let userEmail = body.email;
      let name = body.name;

      // Find the cart items of the user
      let cartItems = await CartModel.find(
        { userId: body.userId },
        { _id: 0, title: 1, author: 1, quantity: 1, sale_price: 1 }
      );

      // Provide email and password to the nodemailer
      let config = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      };

      // Creates a transporter to transport the mail
      let transporter = nodemailer.createTransport(config);

      // Creates an object of MailGen class
      let mailGenerator = new MailGen({
        theme: "default",
        product: {
          name: "Book App",
          link: "https://mailgen.js/",
        },
      });

      let tableData = [];

      // Creates the data array of objects with cart items
      cartItems.map((item) => {
        let obj = {
          Title: item.title,
          Author: item.author,
          Quantity: item.quantity,
          Price: item.sale_price,
        };
        tableData.push(obj);
      });

      // Response to be sent to the user
      let userResponse = {
        body: {
          name: name,
          intro: "Your Order Placed",
          table: {
            data: tableData,
          },
          outro: `Thank you for the purchase. \n\n Total price: Rs. ${body.totalPrice}.\n\n You will receive your books shortly.`,
        },
      };

      // Response to be sent to the admin
      let adminResponse = {
        body: {
          name: "Admin",
          intro: `${name} placed an order of Rs. ${body.totalPrice}`,
          table: {
            data: tableData,
          },
          outro: `Purchase successful`,
        },
      };

      // Generates mail for user and admin
      let mailToUser = mailGenerator.generate(userResponse);
      let mailToAdmin = mailGenerator.generate(adminResponse);

      // Messages for the mail
      let userMessage = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Your purchase on the Book App",
        html: mailToUser,
      };

      let adminMessage = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "Someone made a purchase",
        html: mailToAdmin,
      };

      let result;

      // Finally sends the mail to user
      await transporter
        .sendMail(userMessage)
        .then(() => {
          result = "Success";
        })
        .catch(() => {
          result = "Failure";
        });

      // Sends the mail to admin
      await transporter
        .sendMail(adminMessage)
        .then(() => {
          result = "Success";
        })
        .catch(() => {
          result = "Failure";
        });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Sends an email to the admin for new book
   * @param {Object} body
   */
  static async requestBook(body) {
    try {
      let bookName = body.bookName;
      let author = body.author;

      // Find the cart items of the user
      let user = await UserModel.findOne({ _id: body.userId });

      // Provide email and password to the nodemailer
      let config = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      };

      // Creates a transporter to transport the mail
      let transporter = nodemailer.createTransport(config);

      // Creates an object of MailGen class
      let mailGenerator = new MailGen({
        theme: "default",
        product: {
          name: "Book App",
          link: "https://mailgen.js/",
        },
      });

      // Response to be sent to the admin
      let adminResponse = {
        body: {
          name: "Admin",
          intro: `${user.name} requested a book`,
          table: {
            data: [
              {
                Name: bookName,
                Author: author,
              },
            ],
          },
          outro: `New Book Requested by ${user.email}`,
        },
      };

      // Generates mail for user and admin
      let mailToAdmin = mailGenerator.generate(adminResponse);

      let adminMessage = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "Someone requested a book",
        html: mailToAdmin,
      };

      let result;

      // Sends the mail to admin with details of the book requested
      await transporter
        .sendMail(adminMessage)
        .then(() => {
          result = "Success";
        })
        .catch(() => {
          result = "Failure";
        });

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = EmailService;
