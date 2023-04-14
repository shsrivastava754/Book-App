const Users = require('../database/Users');
const Books = require('../database/Books');
const bcrypt = require('bcrypt');

const getUsers = async ()=>{
    const users = await Users.find();
    return users;
}

const findUserByUsername = async(username)=>{
    const user = await Users.findOne({ username: username });
    return user;
}

const registerUser = async(body)=>{
    let saltRounds = 10;
    let hashedPass = bcrypt.hashSync(body.password,saltRounds);
    let newUser = new Users({
        name: body.name,
        username: body.username,
        password: hashedPass,
        email: body.email,
        role: "User"
    });
    
    await newUser.save();
    return newUser;
};

const verifyUser = (enteredPassword,actualPassword)=>{
    let verified = bcrypt.compareSync(enteredPassword,actualPassword);
    return verified;
};

const countDonations = async(id)=>{
    const donationsCount = await Books.count(
        {
          donatedById: id
        }
      );

      return donationsCount;
}



module.exports.getUsers = getUsers;
module.exports.findUserByUsername = findUserByUsername;
module.exports.registerUser = registerUser;
module.exports.verifyUser = verifyUser;
module.exports.countDonations = countDonations;