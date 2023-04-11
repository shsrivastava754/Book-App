const Books = require("../database/Books");
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
        role: "User"
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

const donations = async (req,res)=>{
  try {
    const donationsCount = await Books.count(
      {
        donatedById: req.params.id
      }
    );

    return res.status(201).json({
      donations: donationsCount
    });

  } catch (error) {
    console.log(error);
  }
};

module.exports.register = register;
module.exports.login = login;
module.exports.getUsers = getUsers;
module.exports.donations = donations;