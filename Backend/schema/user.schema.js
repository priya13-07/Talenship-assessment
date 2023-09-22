const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required : true,
        minLength: 2,
        maxLength: 30,
        trim: true
    },
    email:{
        type : String,
        required: true,
        unique: [true, "Duplicate email found, please use another email."],
        validate: [validator.isEmail, "Please enter a  valid email."]
    },
    password : {
        type: String,
        required: true,
        minLength: 5,
    },
    role : {
        type : String,
        default : "user",
        enum : ["user", "admin"]
    }
},{
    timestamps: true ,
    versionKey: false
});

const User = mongoose.model("User", UserSchema);

module.exports = User ;