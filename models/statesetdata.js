const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const stateSchema = new Schema({
 
    type:{
    type:String,
  },
  orderDate:{
    type:String,
    
  },
  state:{
    type:String,
  },
  price:{
    type:Number,
  },
  quantity:{
    type:Number,
  },

})
module.exports = mongoose.model("Stateset",stateSchema);