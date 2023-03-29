const Users = require('../database/Users');

const register= async (req,res)=>{
    let newUser;

    try {
        const user = await Users.findOne({username:req.body.username});
        if(user){
            return res.status(500).json({message:"User already exists"});
        } else {
            newUser = new Users({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                role: "User"
            });
            await newUser.save();
        }
    } catch (error) {
        console.log(error);
    }

    if(!newUser){
        return res.status(500).json({message:"No user added, some error"});
    }

    return res.status(201).json({newUser});
}

const login = async(req,res)=>{
    try {
        const user = await Users.findOne({username:req.body.username});
        if(!user){
            return res.status(500).json({message:"Invalid User"});
        } else {
            if(user.password===req.body.password){
                return res.status(201).json({user});
            } else {
                return res.status(501).json({message:"Password mismatch"});
            }
        }
    } catch (error) {
        console.log(err);
    }
}

module.exports.register = register;
module.exports.login = login;