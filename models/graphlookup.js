const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const GraphlookupSchema = new Schema({

    item_id:{
        type:Number
    },
    name:{
    type:String,
    },
    reportsTo:{
        type:String

    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    updatedAt:{
        type:Date,
        default:Date.now(),
    },


})
module.exports = mongoose.model('graphLookup',GraphlookupSchema)