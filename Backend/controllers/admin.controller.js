const User = require("../schema/user.schema");
const bcrypt = require("bcrypt");

const loadLogin = async (req,res) => {
    try {
        res.render('adminLogin');
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email : email});
        if(userData){
            console.log(`User role: ${userData.role}`);
            const passMatch = await bcrypt.compare(password, userData.password);
            if(passMatch){
                console.log(`User role: ${userData.role}`); // Debugging statement

                if(userData.role === "user"){
                    res.render('adminLogin', {message:"Email and Password is incorrect"})
                } else {
                    req.session.user_id = userData._id;
                    res.redirect('/admin/adminDash');
                }

            } else {
                res.render('adminLogin', {message:"Email and Password is incorrect"})
            }

        } else{
            res.render('adminLogin', {message: "Email and password are incorrect."});
        }

    } catch (error) {
       console.log(error.message); 
    }
}

const LoadDash = async (req,res) => {
    try {
        const userData = await User.findById({_id : req.session.user_id});
        res.render('adminDash', {admin:userData})
    } catch (error) {
        console.log(error.message);
    }
}

const logout = async(req, res) => {
    try {
        req.session.destroy();
        res.redirect('/admin');
    } catch (error) {
        console.log(error.message);
    }
}

const Adash = async(req,res) =>{
    try {
        const userDate = await User.find({role:"user"})
        res.render('dashboard',{user:userDate})

    } catch (error) {
        console.log(error.message);
    }
}

const editUser = async (req,res) => {
    try {
        const id = req.query.id;
        const userData = await User.findById({_id: id})
        if(userData){
            res.render('edit-user', {user:userData});
        } else {
            res.redirect('/admin/dashboard')
        }

    } catch (error) {
        console.log(error.message);
    }
}

const updateUser = async (req,res) => {
    try {
        const userData = await User.findByIdAndUpdate({_id: req.body.id}, { $set:{ name : req.body.name , email : req.body.email}} );
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async (req,res) => {
    try {
        const id = req.query.id;
        await User.deleteOne({_id:id })
        res.redirect('/admin/dashboard')
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {loadLogin, verifyLogin, LoadDash, logout,Adash, editUser, updateUser, deleteUser};