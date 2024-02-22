const mongoose = require("mongoose");
const loginSchema =  mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    pasword:{
        type:Number,
        required:true
    },
    dialCode: {
        type: Number,
        default: "",
    },
    secretCode: {
        type: String,
        default: "",
    },
    deviceToken: {
        type: String,
        default: "",
        enum: ["","WEB", "IOS", "ANDROID"],
    },


})
module.exports = mongoose.model("login",loginSchema)