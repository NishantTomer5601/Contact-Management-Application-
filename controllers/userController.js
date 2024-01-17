const asynchandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

// register user

const registerUser=asynchandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username|| !email || !password){
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const userAvailable=await User.findOne( {email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }   
    
    //now, we need to create a new user , and we have password which we would not want to store directly into our databases, 
    //therefore , we will use bcrypt library for passowrd hashing..

    const hashedPassword=await bcrypt.hash(password,10);
    console.log("Hashed Password", hashedPassword);

    const user=await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User Created Successfully as ${user}`);
    if(user){
        res.status(201).json({_id : user.id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error({message: "User data not valid"});
    }
    // res.status(200).json({message: "Register the user"});
});



//login user
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
 // res.json({message : "Login User"});
});


//login user
const CurrentUser=asynchandler(async(req,res)=>{
    res.json(req.user);  
    
    
});
module.exports={registerUser,loginUser,CurrentUser};