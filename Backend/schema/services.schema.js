const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicesSchema = new Schema({
    name: {
        type: String,
        required : true,
        minLength: 2,
        maxLength: 30,
        trim: true
    },

    description:{
        type : String,
        required: false,
    },
    prize:{
        type : Number,
        required: true,
    }
},{
    timestamps: true ,
    versionKey: false
});

const Services = mongoose.model("Services", ServicesSchema);

module.exports = { Services };