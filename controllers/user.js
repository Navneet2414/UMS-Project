const express = require('express');
const Model = require("../models/user");
const validation = require('../controllers/validation/uservalid');
const JWT_SECRET = "ABCDEFGHIJKLMNOPQRS";
const jwt = require("jsonwebtoken");
const { models } = require('mongoose');


module.exports.uploadFile = async(req,res,next) =>{
   try{
    let filePath = "";
    if(!req.file) throw new Error("UPLOADING_ERROR");
 const metadata = {
    contentType: req.file.mimetype,
 };
 const fileName = await functions.generateNumber(4);
 const storageRef = ref(
    bucket,
    `images/${fileName + req.file.originalname}`

 );
 console.log(storageRef);
 const file = fs.readFileSync(req.file.path);
 let buffer = new Buffer.from(file);
 console.log(buffer);
 
 await uploadBytes(storageRef, buffer ,metadata).then(async(snapshot) =>{
       console.log("snapShot",snapshot);
       await getDownloadURL(storageRef).then((downloadURL) => {
        console.log("Download",downloadURL);
        filePath = downloadURL;

       }); 
    
 });
 return res.success("Image uploaded successfully",{
   filePath, 
 });

   }catch(error){
    next(error);
   }
};

    module.exports.Register = async(req,res)=> {
        try{
            
            await validation.register.validateAsync(req.body);
        
             const  userDetail = await Model.findOne({
                 email:req.body.email,
                
             })
            // // console.log(userDetail);
             if(userDetail){
                 return res.send("user already registered");
             }
            // else{
            //     res.send("user side error");
            // // }
            //      };
            

            const user = new Model({
                firstName:req.body.firstName,
                email:req.body.email,
                phoneNo:req.body.phoneNo,
                password:req.body.password,
                
            
        });
        
            const UserData = await user.save();
            
            const data = {
                user: {
                    id: user.id,
                },
            };
            console.log("data",data);
            const jwtData = jwt.sign(data, JWT_SECRET);
            console.log("token",jwtData);
              user.save(jwtData);
            
            res.send({message:"ACCOUNT CREATED SUCCESSFULLY",UserData,jwtData});
            

        }catch(error){
            res.send(error.message);
        }
    }
    


module.exports.updateProfile = async(req,res,next) =>{
try{
 await validation.user.updateProfile.validateAsync(req.body);
 let getdocument;
 let getDldocument;
 var documentInfo = await Model.user.findOne({_id:req.user.id});
 if(documentInfo){
    var{document, Dldocument} = documentInfo;
    console.log("document",document.length,"Dldocument",Dldocument.length);
    if(req.body.Dldocument){
        getDlDocument = req.body.Dldocument;
        Dldocument.push(...getDldocument);
    }
    let location = {};
    let coordinates = [];

    if(req.body.latitude && req.body.longitude){
        coordinates.push(Number(req.body.longitude));
        coordinates.push(Number(req.body.latitude));
        location.type = "Point";
        location.coordinates = coordinates;
        req.body.location = location;

    }
    req.body.isProfileSetup = true;
    const getData = await Model.user.findOne({_id:req.body.user.id});
    if(req.body.phoneNo) {
        const updated = await Model.user.findOneAndUpdate({
            _id: req.user._id,
        },
        {
            "tempData.phoneno":req.body.phoneNo,
            phoneNo: req.body.phoneNo,
            ...req.body,
        },
        {
            new: true,
        }

    );
    return res.success("Profile updated successfully",updated)
    }
    console.log("na");

 }
 const updated  = await Model.user.findOneAndUpdate(
    {
        _id:req.user._id,
    },
    {
        ...req.body,
        documentStatus: "UPLOADED",
        document:  document,
        Dldocument:Dldocument,

    },
    {
        new:true,
    }
 );
 return res.success("Profile updated successfully",updated);
} catch(error){
 next(error);
}   
};
module.exports.documentUpload = async(req,res) => {
    

}
module.exports.getProfile = async (req, res, next)=>{
    
    try{
        const doc = await Model.findOne(
            // {accessToken},
            {email:req.body.email}
            )
       

    // });
    return res.send({message:"Data _Fetched",doc});
}catch(error){
    next(error);
}
};
module.exports.addvehicle = async(req, res, next ) => {
    try{
        const adddurationdiscount = req.body.adddurationdiscount;;
        const checkApproval = await Model.findOne({ _id:req.user._id})
        if (checkApproval.documentStatus !== "APPROVED"){
            return res.error("Your Profile is not Approved");
        }
        let resultToReturn = false;
        for(let i = 0; i <  adddurationdiscount.length; i++){
           for(let j = 0; j < adddurationdiscount.length; i++){
            if(i !== j) {
                if (adddurationdiscount[i].days === adddurationdiscount[j].days) {
                    resultToReturn = true;
                    break;
                }
            }
           } 
        }
        if (resultToReturn) {
            return res.error("Please choose Different days in Add Duration Discount");
        }
        await validation.vehicle.validateAsync({...req.body})
            const doc = await Model.Vehicle.create({
                ...adddurationdiscount,
                userId: req.user.user._id,
                ...req.body,
            })
            await doc.save();

            let tempUserDeviceTokens = [];
            let tempUserId = [];
            const user = await Model.findOne({ _id: req.user._id});
            const admins = await Model.find({
                isDeleted: false,
                devicetoken:{$exists: true, $ne:null},
                deviceToken: {$exists: true, $ne:""},
            });
            if(admins){
                admins.forEach((admin) => {
                    if(admin.devicetoken){
                        tempUserDeviceTokens.push(admin.deviceToken);
                        let object = {
                            type: "ADD_VEHICLE ",
                            userId: admin._id,
                            title: "ADD VEHICLE SUCCESSFULLY",
                            message:`VEhicle added successfully by ${user.firstName} ${user.lastName}`,
                            category:"SINGLE",
                        };
                        tempUserId.push(object);
                    }
                });
            }
            if(tempUserDeviceTokens){
               var token = tempUserDeviceTokens;
                var body = `Vehicle added Successfully by ${user.firstName} ${user.lastName} `;
                var title = "ADD VEHICLE SUCCESSFULLY";
                let message = await sendSingleNotification(token, title,body);
                 const doc1 = await Model.NotificationModel.insertMany(tempUserId);   

            }
    }catch(error){
        res.send("Some error occured in it");
    }
}