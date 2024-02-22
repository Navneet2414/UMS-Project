const mongoose = require('mongoose');
const Schema = mongoose.Schema
const addToSetSchema = new Schema({
  item:{
    type:String,
  },
  price:{
    type:Number,

  } ,
  quantity:{
    type:Number
  },
  date:{
    type:Date,
    default:Date.now(),
  }

})
module.exports = mongoose.model('addToset',addToSetSchema);