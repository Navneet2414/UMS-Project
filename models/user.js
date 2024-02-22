const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DocSchema = new Schema(
    {
        adminId: {
            type: Schema.Types.ObjectId,
            // ref:"Admins",
            // default:null,
        },
        email:{
            type:String,

            // default:"",
        },
        password:{
            type: String,
            // default:"",


        },
        phoneNo: {
            type:String,
            // default:"",

        },
        countryCodephoneNo:{
            type:Number,
            default:91,
        },
        location:{
            type:{
                type:String,
            },
            coordinates:[Number],
        },
        latitude:{
            type:Number,
            default:0,
        },
        longitude:{
            type:Number,
            default:0,
        },
        dialCode:{
            type:String,
            default:"",
        },
        lastName:{
            type:String,
            default:"",
        },
        firstName:{
            type:String,
            default:"",
        },
        image:{
            type:String,
            default:"",
        },
        document:{
            type:[],
            default:[],
        },
        Dldocument:{
            type:[],
            default:[],
        },
        birthDate:{
            type:Date,
            default: new Date(),
        },
        address:{
            type:String,
            default: "",

        },
        isNewUser:{
            type:Boolean,
            default: true,

        },
        nationality:{
            type:String,
            default:"",
            index:true,
        },
        isEmailVerified:{
            type:Boolean,
            default:false,
        },
        isPhoneVerified:{
            type:Boolean,
            default:false,
        },
        isProfileSetup:{
            type:Boolean,
            default:false,

        },
        isActive:{
            type:Boolean,
            default: true,
        },
        isApproved:{
            type:Boolean,
            default:false,
        },
        isBlocked:{
            type:Boolean,
            default:false,
        },
        isDeleted:{
            type:Boolean,
            default:false,
        },
        accessToken:{
            type:String,
            default:"",
            index:true,
        },
        deviceType:{
            type:String,
            default:"",
            enum:["","WEB","IOS","ANDROOID"],

        },
        secretCode:{
            type:String,
            default:"",

        },
        SecretEXpiry:{
            type:Date,
            default:0,
        },
        tempData:{
            type:Object,
            default:0,

        },
        lastLogin:{
            type:Date,
        },
        loginCount:{
            type:Number,
            default:0,
        },
        documentStatus:{
            type:String,
            default:"NOT_UPLOADED",
            enum:["NOT_UPLOADED","UPLOADED","REJECTED","MODIFIED"],
        },
        documentRemark:{
            type:String,
            default:'',
        },
        isHost:{
            type:Boolean,
            default: false,
        }

    },
    {
        timestamps:true,
    }
);
module.exports = mongoose.model("Userside",DocSchema);