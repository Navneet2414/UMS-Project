const mongoose = require('mongoose');
const Schema = mongoose.Schema
const IssueSchema = new Schema({
    name:{
        type:String,
        required:true,
        },
        email:{
            type:String,
            required:true,
        },
        Password:{
            type:String,
            required:true,
            
        },
    Assigned:{
        type:String,
        required:false,
        default: 0,
    },
    AssignedBy:{
        type:String,
        required: false,

    },
    ReviewBy:{
        type:String,
        default: 0,
        code:"reviewer",

    },
    projectName:{
        type: String,
        default:0,
        required:false,
    },
    created_at:{
        type:Date,
        required:true,
        default:Date.now,
    },
    Description:{
        type:String,
        required:false,
        default:0,

    },
    Language:[{
        type:String,
        required:false,
    }]

})
module.exports = mongoose.model("Table",IssueSchema);
