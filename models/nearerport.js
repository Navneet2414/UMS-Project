const mongoose = require('mongoose');
const Schema = mongoose.Schema
const nearportSchema = new Schema({
    item_id:{
        type:Number,
    },
    airport:{
        type:String,

    },
    connects:[{
        type:String
    }]

})
module.exports = mongoose.model('nearerport',nearportSchema);
