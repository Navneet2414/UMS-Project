const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const nearer_portSchema = new Schema({
    item_id:{
        type:Number
    },
    name:{
        type:String
    },
    nearestAirports:[{
       type:String 
    }]
}) 
module.exports = mongoose.model('near_port',nearer_portSchema);