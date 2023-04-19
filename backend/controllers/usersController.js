const userServices = require('../services/userServices');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const getUsers = async (req, res) => {
  let users;
  try {
    users = await userServices.getUsers();
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

  try {
    const user = await userServices.findUserByUsername(req.body.username);
    if (user) {
      return res.status(500).json({ message: "User already exists" });
    } else {
      newUser = await userServices.registerUser(req.body);
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
    const user = await userServices.findUserByUsername(req.body.username);
    if (!user) {
      return res.status(500).json({ message: "Invalid User" });
    } else {
      let verified = userServices.verifyUser(req.body.password,user.password);
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
    const donationsCount = await userServices.countDonations(req.params.id);

    return res.status(201).json({
      donations: donationsCount
    });

  } catch (error) {
    console.log(error);
  }
};

const returnlocalStorage = async(req,res)=>{
  try {
    const userData = localStorage.getItem('user');

    return res.status(201).json({
      user: userData
    });

  } catch (error) {
    console.log(error);
  }
}

module.exports.register = register;
module.exports.login = login;
module.exports.getUsers = getUsers;
module.exports.donations = donations;
module.exports.returnlocalStorage = returnlocalStorage;