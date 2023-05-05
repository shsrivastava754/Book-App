const CartModel = require("../database/schema/cart.schema");
const BookModel = require("../database/schema/book.schema");
const BookService = require("./book.service");
const nodemailer = require('nodemailer');
const MailGen = require('mailgen');

/**
 * Class for Cart Services
 */
class CartService {
  /**
   * Function to return a single item from cart of a particular user
   * @param {ObjectId} userId
   * @param {String} title
   * @returns {Object} the item from the cart collection
   */
  static async returnItem(userId, bookId) {
    const item = await CartModel.findOne({
      userId: userId,
      bookId: bookId,
    });

    return item;
  }

  /**
   * Function to update the quantity of item in the cart of the user
   * @param {Object} item - Object with details of the item
   * @returns {Object} the updated item
   */
  static async updateItemQuantity(item) {
    await CartModel.updateOne(
      { bookId: item.bookId, userId: item.userId },
      {
        $set: {
          quantity: item.quantity + 1,
        },
      }
    );
    return item;
  }

  /**
   * Function to add new item to the cart
   * @param {Object} body
   */
  static async addNewItem(body) {
    let cartItem = new CartModel({
      title: body.title,
      bookId: body.bookId,
      author: body.author,
      price: body.price,
      sale_price: body.sale_price,
      quantity: 1,
      userId: body.userId,
      userEmail: body.userEmail,
    });

    await cartItem.save();
    return cartItem;
  }

  /**
   * Function to return cart items of a user
   * @param {ObjectId} id
   * @returns {Array} cart items of a user
   */
  static async returnCartItems(id) {
    let items = await CartModel.find({ userId: id });
    return items;
  }

  /**
   * Returns the total price in cart of the user
   * @param {String} id
   * @returns {Number} total price
   */
  static async returnTotalPrice(id) {
    let items = await CartModel.find({ userId: id });
    let totalPrice = 0;
    items.map((item) => {
      totalPrice = totalPrice + item.sale_price * item.quantity;
    });
    return totalPrice;
  }

  /**
   * Function to clear cart of a particular user
   * @param {ObjectId} id
   */
  static async clearCart(id) {
    await CartModel.deleteMany({ userId: id });
  }

  /**
   * Function to delete an item from the cart of a user
   * @param {ObjectId} userId
   * @param {ObjectId} itemId
   */
  static async deleteItem(userId, itemId) {
    await CartModel.deleteOne({ userId: userId, _id: itemId });
  }

  /**
   * Function that checks if the book is left for a user to add in cart or not
   * @param {String} userId
   * @param {String} bookId
   * @returns {Boolean} whether book is left or not
   */
  static async compareCartQuantity(userId, bookId) {
    const book = await BookModel.findOne({ _id: bookId });
    const cartItem = await CartModel.findOne({
      userId: userId,
      bookId: bookId,
    });
    let res;
    if (cartItem != null) {
      if (cartItem.quantity < book.quantity) {
        res = true;
      } else {
        res = false;
      }
    } else {
      res = true;
    }

    return res;
  }

  /**
   * Returns the quantities of book in cart model and book in books model
   * @param {String} userId
   * @param {String} itemId
   * @param {String} bookId
   * @returns {Array} of quantities
   */
  static async returnQuantities(userId, itemId, bookId) {
    try {
      let cartItem = await CartModel.findOne({ userId: userId, _id: itemId });
      let book = await BookModel.findOne({ _id: bookId });
      if (cartItem && book) {
        return [cartItem.quantity, book.quantity];
      } else {
        return [null, null];
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Update the cart and books collection after checkout
   * @param {String} userId
   */
  static async checkoutUser(userId) {
    let cartItems = await CartModel.find({ userId: userId });
    cartItems.map(async (item) => {
      // Update the quantity of each book in the books collection
      await BookService.updateQuantities(item.bookId, item.quantity);
    });

    this.clearCart(userId);
  }

  /**
   * Increment the quantity of item in the cart
   * @param {String} userId
   * @param {String} itemId
   */
  static async incrementQuantity(userId, itemId) {
    let cartItem = await CartModel.findOne({ _id: itemId, userId: userId });
    cartItem.quantity += 1;
    await cartItem.save();

    return cartItem;
  }
  
  /**
   * Decrement the quantity of item in the cart
   * @param {String} userId
   * @param {String} itemId
  */
 static async decrementQuantity(userId, itemId) {
    let cartItem = await CartModel.findOne({ _id: itemId, userId: userId });
    cartItem.quantity -= 1;
    await cartItem.save();
    
    return cartItem;
  }
  
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
      await transporter.sendMail(message).then((info)=>{
        result = {
          msg: "You should receive an email",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info)
        }
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
  static async sendEmailToAdmin(body){
    try{
    let userEmail = body.email;
    let name = body.name;

    // Find the cart items of the user
    let cartItems = await CartModel.find({userId: body.userId},{ _id: 0, title: 1, author: 1, quantity: 1, sale_price: 1 });

    // Provide email and password to the nodemailer
    let config = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    };

    // Creates a transporter to transport the mail
    let transporter = nodemailer.createTransport(config);

    // Creates an object of MailGen class
    let mailGenerator = new MailGen({
      theme: 'default',
      product: {
        name: "Book App",
        link: 'https://mailgen.js/'
      }
    });

    let tableData = [];

    // Creates the data array of objects with cart items
    cartItems.map((item)=>{
      let obj = {
        Title: item.title,
        Author: item.author,
        Quantity: item.quantity,
        Price: item.sale_price
      };
      tableData.push(obj);
    });

    // Response to be sent to the user
    let userResponse = {
      body:{
        name: name,
        intro: "Your Order Placed",
        table :{
          data: tableData
        },
        outro: `Thank you for the purchase. \n\n Total price: Rs. ${body.totalPrice}.\n\n You will receive your books shortly.`
      }
    };

    // Response to be sent to the admin
    let adminResponse = {
      body:{
        name: "Admin",
        intro: `${name} placed an order of Rs. ${body.totalPrice}`,
        table :{
          data: tableData
        },
        outro: `Purchase successful`
      }
    }

    // Generates mail for user and admin
    let mailToUser = mailGenerator.generate(userResponse);
    let mailToAdmin = mailGenerator.generate(adminResponse);

    // Messages for the mail
    let userMessage = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Your purchase on the Book App",
      html: mailToUser
    };

    let adminMessage = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Someone made a purchase",
      html: mailToAdmin
    };

    let result;

    // Finally sends the mail to user
    await transporter.sendMail(userMessage).then(()=>{
      result = "Success"
    }).catch(()=>{
      result = "Failure"
    });

    // Sends the mail to admin
    await transporter.sendMail(adminMessage).then(()=>{
      result = "Success"
    }).catch(()=>{
      result = "Failure"
    });

    return result;
  }

    catch(error) {
      console.log(error);
    }
  }
}

module.exports = CartService;
