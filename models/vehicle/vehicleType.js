const mongoose =require("mongoose");
const VehicleTypeSchema = new mongoose.Schema({
    name: {type: String, required:true },
    nameId:{type:String,required:true},
    isActive: {
        type: Boolean,
        default: true,

    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
},
{
   timestamps: true, 

});
module.exports = mongoose.model("VehicaleTypeSchema", VehicaleTypeSchema);