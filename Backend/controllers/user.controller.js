const User = require("../schema/user.schema");
const bcrypt = require("bcrypt");

const securePass = async (password) => {
    try {
        const hashPass = bcrypt.hash(password, 10);
        return hashPass;
    } catch (error) {
        console.log(error.message)
    }
}

const loadRegister = async (req,res) => {
    try {
        
        res.render('register')

    } catch (error) {
        console.log(error.message);
    }
}

const register = async (req,res) => {
    try {

        const sPassword = await securePass(req.body.password);

        const newUser = new User({
            name : req.body.name,
            email: req.body.email,
            password : sPassword,
            role: "user"
        })

        const users = await newUser.save();

        if(users){
            res.render('register', {message:"Registered successfully"})
        } else {
            res.render('register', {message:"Failed to Register"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loadLogin = async (req,res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
    }
}

const login = async (req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email : email});

        if(userData){
           
            const passMatch = await bcrypt.compare(password, userData.password);
            if(passMatch){
                req.session.user_id = userData._id;
                res.redirect('/userDash')
            } else {
                res.render('login', {message:"Email and Password is incorrect"})
            }
        } else {
            res.render('login', {message:"Email and Password is incorrect"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const home = async (req,res) => {
    try {
        const userData = await User.findById({ _id:req.session.user_id });
        res.render('userDash',{user : userData})
    } catch (error) {
        console.log(error.message);
    }
}

const logout = async (req,res) => {
    try {
        req.session.destroy();
        res.redirect('/')
    } catch (error) {
        console.log(error.message)
    }
}

const editUser = async (req,res) => {
    try {

        const id = req.query.id;

        const userData = await User.findById({ _id : id});

        if(userData){
            res.render('edit', {user: userData});
        } else {
            res.redirect('/userDash');
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

const updateProfile = async (req,res) => {
    try {
        
       const userData = await User.findByIdAndUpdate({_id: req.body.user_id}, { $set : {name:req.body.name, email:req.body.email}})
        res.redirect('/userDash');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {loadRegister, register, loadLogin, login, home, logout,editUser,updateProfile};

// sessionSecret = "sessionSecret"