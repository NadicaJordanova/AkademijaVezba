const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const util = require("util");

exports.signUp = async (req, res) => {
  try {

   
    const newUser = await User.create({
      ime: req.body.ime,
      age: req.body.age,
      password: req.body.password,
      email: req.body.email,
    });

    const token = jwt.sign(
      {
        ime: newUser.ime,
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(201).json({
      status: "Created",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err: err.message,
    });
  }
};

exports.logIn = async (req, res) => {

    try{
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(401).send("Please enter email or password");
          }
    
         const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).send("Invalid email or password");
        }
    
        unesenpass = crypto.createHash('sha256').update(password).digest('hex');
    
        const validPassword = bcrypt.compareSync(password, user.password);
    
        if (!validPassword) {
            return res.status(401).send("Invalid email or password");
          }
     
          const token = jwt.sign(
            {
                id: user._id,
                ime: user.ime,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRES,
            }
          )
    
          res.cookie("jwt", token, {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            secure: false,
            httpOnly: true,
          });
    
    
          res.status(201).json({
            status: "success",
            token: token,
            user,
          });
    }
    catch(err){
        res.status(500).json({
            status: "fail",
            err: err.message,
          });
    }
      

}


exports.protect = async (req, res, next) => {
    try{
let token 
if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(500).send("You are not logged in, please log in");
  }

  const decoded = await util.promisify(jwt.verify)(
       token,
       process.env.JWT_SECRET
  )
  const userTrue = await User.findById(decoded.id);
  if (!userTrue) {
    return res.status(401).send("User does not longer exist!");
  }
  req.auth = userTrue;

  next();
    }
    catch(err){
        res.status(500).json({
            status: "fail",
            err: err.message,
          }); 
    }
}