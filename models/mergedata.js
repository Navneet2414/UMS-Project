const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mergeSchema = new Schema({
    item:{
        type:Number
    },
    fiscalYear:{
        type: Number
    },
    salaries:{
        type:Number
    },
    dept:{
        type:String
    },
    employee:{
        type:String
    },

    


})
module.exports = mongoose.model('datamerge',mergeSchema);