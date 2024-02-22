const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const artistSchema = new Schema({
    title:{
        type:String,
    },
    artist:{
        type:String,
    },
    year:{
        type:Number
    },
    price:{
        type:String
    },
    
})
module.exports = mongoose.model('artist',artistSchema);