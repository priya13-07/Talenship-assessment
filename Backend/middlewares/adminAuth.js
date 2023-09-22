const isLogin = async(req,res,next) => {
    try {
        
        if(req.session.user_id){}
        else{
            res.redirect('/admin')
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

const isLogout = async(req,res,next) => {
    try {
        
        if(req.session.user_id){
            res.redirect('/admin/adminDash')
        }
        next();

    } catch (error) {
        console.log(erroe.message);
    }
}

module.exports = {isLogin, isLogout};