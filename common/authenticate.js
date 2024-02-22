const jwt = require("jsonwebtoken");
const JWT_SECRET = 'ABCDEFGHIJKLMNOPQRS';
// const  Model  = require("mongoose");
// const { removeListener } = require("../models/userModel");
const Model = require("../models/userModel");
const Models = require("../models/user");
module.exports.getToken = (data) =>
    jwt.sign(data,process.env.SECRET_KEY,{ expiresIn: "30 days"});

module.exports.verifyToken = (token) =>
 jwt.verify(token, process.env.SECRET_KEY);

 module.exports.verify = 
 (...args) =>
 async (req,res, next) => {  
    try{
        const roles = [].concat(args).map((role)=> role.toLowerCase());
    const token = String(req.headers.authorization || "")
        .replace(/bearer|jwt/i, "")
        .replace(/^\s+|\s+$/g, "");
        let decoded;
        // console.log(token, "tokenn");
        if (token) decoded = this.verifyToken(token);
        console.log(token);
        // res.json(token);
        let doc = null;
        let role = "";
        if (!decoded && roles.includes("guest")){
                role = "guest";
                return next();
                
                
    }  
    if (roles.includes("vender")){
        role ="vender";
        doc = await Model.Vender.findOne({
            _id: decoded._id,
            accessToken: token,
            isBlocked: false,
            isDeleted:false,
        });
    }
    if (roles.includes("User")){
        role = "User";
        doc = await User.findOne({
            _id: decoded._id,
            accessToken: token,
            isBlocked:false,
            isDeleted: false,
            });
            
    }
    if (roles.includes("user")){
        role = "user";
        doc = await Models.findOne({
            _id: decoded._id,
            accessToken: token,
            isBlocked:false,
            isDeleted: false,
            });
            
    }
   
    if(roles.includes("admin")) {
        role = "admin";
        doc = await Admins.findOne({
            _id: decoded._id,
            accessToken: token,
            isBlocked: false,
            isDeleted:false,
        })
    }
    
    
    if (!doc) throw new Error("INVALID_TOKEN")
    if (role) req[role] =  doc.toJSON();
    next();
}
 catch (error) {
    console.error(error);
    const message = 
    String(error.name).toLowerCase() === "error"
        ? error.message
        : "UNAUTHORISED_ACCESS";
    return res.error(402, message);
}
 };
 

