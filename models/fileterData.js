const mongoose = require ('mongoose');
const Schema = mongoose.Schema
const FilterSchema = new Schema({
    
    
    Item:[{
        item_id:{type:Number,default:0},
        name: {type:String,default:""} ,
        quantity: {type:Number,default:0},
        price: {type:Number,default:0},
    }],
// }

})
module.exports = mongoose.model("Product",FilterSchema);
