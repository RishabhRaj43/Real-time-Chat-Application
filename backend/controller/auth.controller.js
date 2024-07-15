import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    // console.log(fullName, userName, password, confirmPassword, gender);
  
    if (password !== confirmPassword) {
      res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      res.status(400).json({ error: "User already exists" });
    }
    //hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = User({
      fullName,
      userName,
      password:hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilepic : girlProfilepic,
    });

    if(newUser){
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id:newUser.id,
        fullName:newUser.fullName,
        userName:newUser.userName,
        password:newUser.password,
        profilePic:newUser.profilePic
      })
    }
    else{
      console.log("Invalid User Data");
      res.status(400).json({error:"Invalid User Data"})
    }   

  } catch (error) {
    console.log("Error in signup controller ",error.message);
    res.status(500).json({error:"Internal Server Error"})
  }
};

export const login = async (req, res) => {
  try {
    const {userName,password} = req.body;
    // console.log(userName,password); 
    const user = await User.findOne({userName});
    const isPassword = await bcrypt.compare(password,user?.password || "");

    if(!user || !isPassword){
      return res.status(400).json({error:"Invalid User Data"});
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id:user.id,
      fullName:user.fullName,
      userName:user.userName,
      profilePic:user.profilePic
    })    
  } catch (error) {
    console.log("Error in login controller ",error.message);
    res.status(500).json({error:"Internal Server Error"})
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logout Successfully"});
  } catch (error) {
    console.log("Error in login controller ",error.message);
    res.status(500).json({error:"Internal Server Error"})
  }
};
