const express = require('express');
const session = require("express-session");
const {sessionSecret} = require("../config/config");
const {isLogin, isLogout} = require("../middlewares/middleware")

const userRouter = express.Router();
const {loadRegister, register, loadLogin, login, home, logout,editUser,updateProfile} = require("../controllers/user.controller");


userRouter.use(session({secret:sessionSecret}));
// const {
//     userAuth,
//     userLogin,
//     checkRole,
//     userRegister,
//     serializeUser
//   } = require("../utils/auth");
// userRouter.set('view engine','hbs');
// userRouter.set('views', './views/register');

  userRouter.get('/register',isLogout , loadRegister);
  userRouter.post('/register', register);
  userRouter.get('/login',isLogout , loadLogin);
  userRouter.post('/login', login);
  userRouter.get('/userDash',isLogin ,home);
  userRouter.get('/logout',isLogin,  logout);
  userRouter.get('/edit', isLogin, editUser);
  userRouter.post('/edit', updateProfile);
  
  module.exports = userRouter;
