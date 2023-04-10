const Users = require("../database/Users");
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  let users;
  try {
    users = await Users.find({});
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(400).json({ message: "No users found" });
  }

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let newUser;
  let saltRounds = 10;
  let hashedPass = bcrypt.hashSync(req.body.password,saltRounds);

  try {
    const user = await Users.findOne({ username: req.body.username });
    if (user) {
      return res.status(500).json({ message: "User already exists" });
    } else {
      newUser = new Users({
        name: req.body.name,
        username: req.body.username,
        password: hashedPass,
        email: req.body.email,
        role: "User",
        cart: []
      });
      await newUser.save();
    }
  } catch (error) {
    console.log(error);
  }

  if (!newUser) {
    return res.status(500).json({ message: "No user added, some error" });
  }

  return res.status(201).json({ newUser });
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) {
      return res.status(500).json({ message: "Invalid User" });
    } else {
      let verified = bcrypt.compareSync(req.body.password,user.password);
      if(verified){
        return res.status(201).json({ user });
      } else {
        return res.status(501).json({ message: "Password mismatch" });
      }
    }
  } catch (error) {
    console.log(err);
  }
};

const addToCart = async (req,res)=>{
  try {
    let user = await Users.findOne({ _id: req.body.userId });
    const userCart = user.cart;
    let flag = 0;
    let newCart;
    for(let i=0;i<userCart.length;i++){
      if(userCart[i].title===req.body.title){
        flag = 1;
        userCart[i].quantity+=1;
        break;
      }
    }

    newCart = userCart;

    if(flag==0){
        const newItem = {
          title: req.body.title,
          price: req.body.price,
          author: req.body.author,
          quantity: 1
        }
        newCart = [...userCart,newItem];
    }
    let updatedUser  = await Users.findByIdAndUpdate(req.body.userId,{
      cart: newCart
    });

    updatedUser.save();
  } catch (error) {
    console.log(error);
  }
};

const returnCartItems = async (req,res)=>{
  let items;
    try {
        let user = await Users.findOne({ _id: req.body.id });
        items = user.cart;
    } catch (err) {
        console.log(err);
    }

    if(!items){
        return res.status(400).json({message:"No cart items"});
    }

    return res.status(200).json({items});
};

const clearCart = async (req,res)=>{
  try {
    let updatedUser  = await Users.findByIdAndUpdate(req.body.id,{
      cart: []
    });

    updatedUser.save();
  } catch (error) {
    console.log(error);
  }
}

module.exports.register = register;
module.exports.login = login;
module.exports.getUsers = getUsers;
module.exports.addToCart = addToCart;
module.exports.returnCartItems = returnCartItems;
module.exports.clearCart = clearCart;
