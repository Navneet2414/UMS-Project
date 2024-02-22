const mongoose =  require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name:String,
    email:String,
    code: String,
    expireIn:  Number,
  
    Language:{
        type:String,
        required:false,
    
    }
},


{
    timestamps:true

})
module.exports = mongoose.model('otp',UserSchema)