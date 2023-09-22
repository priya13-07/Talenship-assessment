const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schema/user.schema.js");

/**
 * @DESC To register the user (ADMIN, USER)
 */

// const validateEmail = async (email) => {
//     let user = await User.findOne({ email : email });
//     return user ? false : true;
//   };

//   const validateUsername = async name => {
//     let user = await User.findOne({ name });
//     return user ? false : true;
//   };

const userRegister = async (userDets, role, res) => {
 try{
   
    // validate the email
    console.log('Validating email...');
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      next("Email Already Register Please Login");
    }
    
    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new User({
      ...userDets,
      password,
      role
    });

    await newUser.save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please login.",
      success: true
    });
}
   catch (err) {
     console.error('Error:', err);
    //  Implement logger function (winston)
     return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

/**
 * @DESC To Login the user (ADMIN, USER)
 */
const userLogin = async (userCreds, role, res) => {
  let { name, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ name });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false
    });
  }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
      },
      { expiresIn: "7 days" }
    );

    let result = {
      name: user.name,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};



// /**
//  * @DESC Passport middleware
//  */
// const userAuth = passport.authenticate("jwt", { session: false });

// /**
//  * @DESC Check Role Middleware
//  */
// const checkRole = roles => (req, res, next) =>
//   !roles.includes(req.user.role)
//     ? res.status(401).json("Unauthorized")
//     : next();



// const serializeUser = user => {
//   return {
//     username: user.username,
//     email: user.email,
//     name: user.name,
//     _id: user._id,
//     updatedAt: user.updatedAt,
//     createdAt: user.createdAt
//   };
// };

module.exports = { userLogin , userRegister };