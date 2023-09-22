const express = require('express');
const adminRouter = express.Router();
const {loadLogin, verifyLogin, LoadDash, logout, Adash, editUser, updateUser, deleteUser} = require("../controllers/admin.controller");
const {isLogin, isLogout} = require("../middlewares/adminAuth")

const session = require("express-session");
const {sessionSecret} = require("../config/config");

adminRouter.use(session({secret:sessionSecret}));

adminRouter.get('/', isLogout ,loadLogin);
adminRouter.post('/',verifyLogin);
adminRouter.get('/adminDash',isLogin, LoadDash);
adminRouter.get('/logout',isLogin, logout);
adminRouter.get('/dashboard',isLogin, Adash);
adminRouter.get('/edit-user',isLogin,  editUser)
adminRouter.post('/edit-user', updateUser)
adminRouter.get('/delete-user', deleteUser)

module.exports = adminRouter;