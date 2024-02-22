const User = require("../models/userModel");
const Otp = require("../models/otp");
const Issue_table = require("../models/Issuetable");
const Product_table = require("../models/fileterData");
const graphTable = require("../models/graphlookup");
const nearPort = require("../models/near_port");
const nearerPort = require("../models/nearerport");
const AddToData = require("../models/addToSetData");
const StateSetData = require("../models/statesetdata");
const Artists = require("../models/artist.");
const MergeData = require("../models/mergedata");
const message = require("./userMessage");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ABCDEFGHIJKLMNOPQRS";
const Joi = require("joi");
const validation = require("./validation/user");
const fetchuser = require("../middleware/fetchuser");
const {
  TrustProductsChannelEndpointAssignmentContext,
} = require("twilio/lib/rest/trusthub/v1/trustProducts/trustProductsChannelEndpointAssignment");
const { db, on } = require("../models/userModel");
const { number } = require("joi");
const { pipeline } = require("nodemailer/lib/xoauth2");
const { ObjectId } = require("mongodb");
const {
  ItemAssignmentContext,
} = require("twilio/lib/rest/numbers/v2/regulatoryCompliance/bundle/itemAssignment");
const addToSetData = require("../models/addToSetData");
// const express = require("express");

//  const authentication = require("../common/authenticate");
// const emailService = require("./emailService");
//  const { Model } = require("mongoose");
//######################Password Hashing###########################
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

// ##########For send Mail########

const loadRegister = async (req, res) => {
  try {
    // await Validation.user.login.validateAsync(req.body);
    res.render("registration");
    res.send(req.body);
  } catch (error) {
    console.log(error.message);
  }
};
// ############################For registering User###########################
const insertUser = async (req, res) => {
  try {
    await validation.login.validateAsync(req.body);
    // await Validation.User.sendOTP.validateAsync(req.body);
    // console.log(req.file)
    // let email = {};
    let userCheck = await User.findOne({ email: req.body.email });
    //  console.log(email)
    if (userCheck) {
      // console.log(email)
      return res.status(400).json({ error: "User Already Registerd" });
    }

    //   const spassword = await securePassword(req.body.pasword);
    //   console.log("PasswordHash:",spassword);
    //   const

    const user = new User({
      name: req.body.name,
      email: req.body.email,

      
      mobile: req.body.mobile,
      // image:req.file.filename,
      // pasword:spassword,
      pasword: req.body.pasword,
      Language: req.body.Language,
      is_admin: 0,
    });

    const userData = await user.save();
    res.send(userData);
    // #############################
    const data = {
      user: {
        id: user.id,
      },
    };
    const jwtData = jwt.sign(data, JWT_SECRET);
    console.log("Token:", jwtData);
    console.log(userData);
    // return res.json(jwtData);
    // console.log(req.body.pasword)

    //         if(userData){

    //             // ## sendVerifyMail(req.body.name,req.body.email,userData._id);
    //             // ## res.render('registration',{message:"Your registration has been successfully"});
    //             const payload ={
    //                 to:'navneetmpec@gmail.com',
    //                 subject:'test',
    //                 message:'<h>Hii Guys</h>'
    //             }
    //             await emailService.send(payload);
    //            // res.send(req.body);
    //             res.status(200).send({ statusCode: 200, message :'Your registration has been successfully', data: userData });

    //         }else{
    //         res.render('registration',{message:"Your registration has been failed.."});
    //     }
  } catch (error) {
    console.log(error.message);
  }
};
// ################################################################
const verifyMail = async (req, res) => {
  try {
    const updateInfo = User.updateOne(
      { _id: req.query.id },
      { $set: { is_verified: 1 } }
    );
    console.log(updateInfo);
    res.render("email_verified");
  } catch (error) {
    console.log(error.message);
  }
};
//  const registered = async(req,res,next) => {
//     try{
//         const criteria  = [];
//         // await validation.User.login.validateAsync(req.body);
//         const userDetail =  await User.findOne({
//             email: req.body.email,
//             isDeleted: false,
//         });
//         if (userDetail) {
//             if (userDetail.isEmailVerified) {
//                 throw new Error(
//                     "We already have Email ID. try logging  in instead"
//                 );
//             }else {
//                 await User.deleteMany({
//                     email:req.body.email,
//                     isEmailVerified: false,
//                 });
//             }
//         }

//                  const doc = await Model.User.create(req.body);
//                 doc.accessToken = await Auth.getToken({
//                     _id: doc._id,
//                 });
//                 await doc.setPassword(req.body.password);
//                 await doc.save();
//                 if (req.body.email) {
//                     await _sendEmailVerification(doc, req.body.email);

//                 }
//                 return res.success("ACCOUNT_CREATED_SUCCESSFULLY",doc );

//     }catch(error){
//         next(error);

//     }
//  };

//  ################# Login User #####################
const loginUser = async (req, res, next) => {
  await validation.loginUser.validateAsync(req.body);

  const { email, pasword } = req.body;
  // console.log(req.body)
  try {
    let user = await User.findOne({ email: email, pasword: pasword });
    // console.log(email)
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct crredentials " });
    }
    // const passwordCompare =   bcrypt.compare(pasword, User.pasword);
    // let passwordCompare = await User.findOne({ pasword: pasword });
    // if (!passwordCompare) {
    //   return res
    //     .status(400)
    //     .json({ error: "Please try to login with correct credential" });
    // }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    // res.send({ authtoken });
    // const Usertoken = await authtoken.save()
    console.log("Account login Successsfully......");

    const loginData = await User.findOneAndUpdate(
      { email: email, pasword: pasword },
      {
        accessToken: authtoken,
      },
      {
        new: true,
      }
    );
    //   return res.json("login Successfully");

    return res.send({ Message: "Successfully Login", loginData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
};
// #################| ** Log out ** |##########################
const logout = async (req, res, next) => {
  try {
    //   console.log(req);
    console.log("req.user.id", req.user.id);

    const loginData = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        accessToken: " ",
      },
      {
        new: true,
      }
    );
    //   return res.json("login Successfully");
    if (loginData) {
      console.log("logout Successfully......");
      return res.send({ Message: "Successfully Logout", loginData });
    } else {
      return "Error";
    }
  } catch (error) {
    next(error);
  }
};
// ###############################|For simply Password Changing|##################################
const changePassword = async (req, res, next) => {
  try {
    // await validation.changePassword.validateAsync(req.body);
    // if (req.body.pasword === req.body.newPasword)
    //   throw new Error("Passwords_SHOULD_BE_DIFFERENT");
    const doc = await User.findOne(
      {
        _id: req.user.id,
        pasword: req.body.pasword,
      },
      {
        pasword: req.body.newPasword,
      }
    );
    if (!doc) {
      throw new Error("ACCOUNT_NOT_FOUND");
    } else {
      return res.send({ message: "Password changed successfully ", doc });
    }
  } catch (error) {
    next(error);
  }
};
// #################################### Forget Password ##########################################
const forgot_Password = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: req.body.email });
    //  console.log(userData);
    if (userData) {
      // const randomString = randomstring.generate(4);
      var otpCode = Math.floor(1000 + Math.random() * 9000);
      let otpData = new Otp({
        email: req.body.email,
        code: otpCode,
        expireIn: new Date().getTime() + 300 * 1000,
      });
      let otpResponse = await otpData.save();
      console.log("otpCode:", otpCode);

      res
        .status(200)
        .send({ success: true, msg: "Please check your mail", otpCode });

      //         await otpCode.save();

      //       // }
      //       // if(userData){

      //       //             // ## sendVerifyMail(req.body.name,req.body.email,userData._id);
      //       //             // ## res.render('registration',{message:"Your registration has been successfully"});
      const payload = {
        // to: "navneetmpec@gmail.com",
        subject: "test",
        message: `<p>password verification Don't share with anyone <p> ${otpCode}`,
      };
      //           // const otp_instance = await randomString.create({
      //           //   otp: randomString,
      //           //   expiration_time: expiration_time
      //           // });
      //           // console.log(otp_instance)
      //         //  await  randomString.save();
      return await emailService.send(payload);

      //       // res.send(req.body);
      //       // res.status(200).send({ statusCode: 200, message :'Your registration has been successfully', data: userData });
    } else {
      res
        .status(200)
        .send({ success: false, msg: "This email does not exist" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: "Invlid emailid" });
  }
};
// #####################################|Update Passsword through OTP|#################################
const UpdatedPassword = async (req, res) => {
  let data = await Otp.findOne({
    email: req.body.email,
    code: req.body.otpCode,
  });
  console.log("checking otp", data);
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let expireIn = new Date().getTime() + 3 * 60000;
    let diff = expireIn - currentTime;
    console.log("currentTime:", currentTime);
    console.log("expireIn", expireIn);
    console.log("diff:", diff);
    if (diff < 0) {
      response.message = "Token Expire";
      response.statusText = "error";
      console.log("changed successfully");
    } else {
      let user = await Otp.findOne({
        email: req.body.email,
        code: req.body.otpCode,
      });
      user.pasword = req.body.pasword;
      user.save();
      response.message = "Password changed Successfully";
      response.statusText = "Success";
      console.log("changed updated password");
    }
  } else {
    response.message = "Invalid otp";
    response.statusText = "error";
  }

  res.status(200).json(response);
};
// ##########################| SEARCHING ELEMENT|############################
const SearchBar = async (req, res, next) => {
  try {
    console.log("In Filter", typeof req.body.key);
    const { name, mobile, email, key } = req.query;
    let filter = {};

    if (name) {
      filter = {
        name: name,
      };
    }
    if (mobile) {
      filter = {
        ...filter,
        mobile: mobile,
      };
    }
    if (email) {
      filter = {
        ...filter,
        email: email,
      };
    }
    if (key) {
      filter = {
        ...filter,
        $or: [
          { name: { $regex: key, $options: "i" } },
          { email: { $regex: key, $options: "i" } },
        ],
        // $or: [{ name: { $regex:req.params.key ,$options: "i"} }, { email: { $regex: req.params.key,$options:"i" } }],
      };
    }
    // console.log("mobile", mobile);
    // //   return;
    var page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    const limit = 2;
    let filteredData = await User.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    if (filteredData) {
      console.log(filteredData);
      res.status(200).send({ Success: "Successfully filtered", filteredData });
    } else {
      res.status(500).json({ success: false });
    }
    // ###################Search Bar Start #########

    // console.log("In Search", typeof req.params.key);

    // if (req.params.key) {
    //   mobile = parseInt(req.params.key);

    //   console.log("mobile", mobile);
    //   if (isNaN(mobile)) {
    //     console.log("mobile123", mobile);
    //     mobile = null;
    //     }
    // }

    // console.log(typeof mobile, mobile);

    // let data = await User.find({
    //   $or: [
    //     { name: { $regex: req.params.key, $options: "i" } },
    //     { email: { $regex: req.params.key, $options: "i" } },
    //     { mobile: mobile },
    //     // {mobile:  {$regex:req.params.key}}
    //   ],
    // });
    // console.log("Searched Successfully....");
    // return res.send({ message: "Searched Successfully", data });
  } catch (error) {
    res.status(400).send("Bad request");
  }
};
// ##################################################################
// const searchDashboard = async(req,res) =>{
//   try{
//      var search = '';
//      if(req.query.search){
//        search = req.query.search;

//      }
//     // console.log(req.params.key)
//     const userdata = await User.find({

//       $or:[
//         {name:{ $regex:'.*'+search+'.*',$options:'i'}},
//         {email:{ $regex:'.*'+search+'.*',$options:'i'}},
//         // {mobile:{$regex:req.params.key,$options:'i'}}
//       ]
//     });
//     console.log("Searched Successfully....",userdata);
//      return res.send(userdata) ;

//   }
//   catch(error){
//     res.send({Message:"Something went wrong",error})

//   }
// }
// ***********************\\
//********************8****** */
// #############################| Practicing on Crud Operation|###############################
// #########################
//#################**

const IssueTable = async (req, res) => {
  try {
    let userdata = await Issue_table.findOne({ email: req.body.email });
    if (userdata) {
      return res.send({ error: "This emailId Already Registered" });
    }
    const salt = await bcrypt.genSalt(10);

    const secPass = await bcrypt.hash(req.body.Password, salt);

    const TableData = await Issue_table.create({
      name: req.body.name,
      email: req.body.email,
      // Password: req.body.Password,
      Password: secPass,
      Assigned: req.body.Assigned,
      AssignedBy: req.body.AssignedBy,
      ReviewBy: req.body.ReviewBy,
      projectName: req.body.projectName,
    });
    const IssueData = await TableData.save();
    console.log(IssueData);
    res.send({ success: "succesfully added", IssueData });
  } catch (error) {
    res.status(400).send(" Some Error Occured in it");
  }
};

// db.Table.aggregate({
//  $lookup:{
//     from: "User",
//     localField: "name",
//     foreignField: "_id",
//     as: "anything"

//   }

// })
// db.aggregate({
//   $lookup:{
//    from:"User",
//    localField:"name",
//    foreignField: "_id",
//    as:"anything"
//   }
// })
// ##########################Fetch User Which is Stored in it ###################################

const getData = async (req, res) => {
  try {
    const Data = await Issue_table.find();
    res.json(Data);
  } catch (error) {
    console.log(error);
    res.send({ error: "Something went Wrong" });
  }
};

// ###########################| Update the stored Data |#################################
const Update_Data = async (req, res) => {
  try {
    let data = await Issue_table.findOne({
      email: req.body.email,
    });
    console.log("checking data", data);
    const response = {};
    if (data) {
      let user = await Issue_table.findOne({
        email: req.body.email,
      });

      user.email = req.body.newemail;
      user.save();
      res.send(user);
    } else {
      res.json({ Message: "error occured in it" });
    }
  } catch (error) {
    res.send({ error: "Something went wrong" });
  }
};
const deleteUser = async (req, res) => {
  const { email } = req.body;
  let note = await Issue_table.findById(req.params.id);
  if (!note) {
    return res.status(400).send("Not Allowed");
  }

  note = await Issue_table.findByIdAndDelete(req.params.id);
  console.log("This usser has been Deleted", note);
  res.json({ Success: "User has been deleted", note });
};
// ############################### Aggreagation Method #################################
const DataAggregat = async (req, res, next) => {
  //  const name = "navneet";//If this is then it will show with every individual data
  // const email="navneetmpec@gmail.com";
  //  const mergeinfo = tables.createIndex({firstName:1},{unique:true});
  const datamatch = await User.aggregate([
    // Join with user_info table
    // Join with user_info table
    // // { $match: { email: "avdhesh@gmail.com" } },
    //  { $match: { name: "navneet"} },
    // // // // // { $match: {userId :_id} },
    // {
    //   $lookup: {
    //     from: "tables", // other table name  from mongodb
    //     localField: "name", // name of users table field
    //     foreignField: "name", // name of userinfo table field
    //     as: "user1", // alias for userinfo table
    //   }
    // },
    //  ******************** |It is for $merge| *****************
    //Merge will  create  another database collection if it is not present
    { $project: { name: "filter" } },

    {
      $merge: {
        into: "newcollection",
        // let:"name",
        // coll:"emp_acc",
        // on:"_id",
        whenMatched: "replace",
      },
    },
    // ###For third table join######
    // {
    //   $lookup: {
    //     from: "otps",
    //     localField: "name",
    //     foreignField: "name",
    //     as: "User2",
    //   },
    // },
    //*****for showing the total   */
    // { $group:{ _id:'$name',email:{$sum:'$Language'}}}
    //******For making a Db collection for storing searched data###
    // {
    //   $match:{email:'navneetmpec@gmail.com'}
    //  $match:{email:'avdhesh@gmail.com'}
    // },
    // {$project:{email:1,name:1,_id:0,email:{$type:'$email'}}},
    // {$out:'info'}
    //########### For showing every index element with it
    //  {
    //   $unwind:"$Language"
    //    },
    //  {$match:{name:"avdhesh"}},

    //###################
    //  {$group:{name:'$name'}},

    // {group:{_id:'$Language'}}
    // {$project:{name:1}},{$sort:{name: -1}}
    // { $match: { name: "Virat"} },
    // {$match:{"Language.isActive":true}},
    // {$project:{
    //   // name:1,
    //   // email:1,
    //   // Language:1,
    //       Language: {
    //           $filter: {
    //              input: "$Language",
    //              as:"language",
    //              cond: { $eq: [ "$$Language.isActive", true] },
    //           }
    //        }
    // }}
  ]);

  if (datamatch) {
    res.send(datamatch);
  } else {
    res.send("no data");
  }
};
// { $unwind: "$user_info" }, // $unwind used for getting data in object or for one record only

//   if (datamatch) {
//     res.send(datamatch);
//   } else {
//     res.send("no data");
//   }
// };
// ...req.body,
// //  _id:req.body._id,
// Item: [
//   {
//     item_id:req.body.item_id,
//     name: req.body.name,
//     quantity: req.body.quantity,
//     price: req.body.price,
//   },
// ],
const insertProduct = async (req, res) => {
  try {
    console.log("in try block");
    const Item = req.body.Item;

    let userCheck = await Product_table.create({ ...req.body });
    const productdata = await userCheck.save();
    console.log(productdata);
    res.send({ Success: "Successfolly added", productdata });
  } catch (error) {
    console.log(error);
    res.send("some error");
  }
};
//   #####################Implementation of Filter ##############################
const dataFilter = async (req, res) => {
  const productDetail = await Product_table.aggregate([
    {
      $project: {
        Item: {
          // _id:1,
          $filter: {
            input: "$Item",
            as: "itemDetail",
            cond: { $lte: ["$$itemDetail.price", 451] },
            // cond: { $gte: ["$$itemDetail.price", 400] },
          },
        },
      },
    },

    // {$match:{itemDetail:{$ne:[]}}}
  ]);
  let newArr = [];
  productDetail.forEach((dd) => {
    if (dd.Item.length != 0) {
      newArr.push(dd);
    }
  });

  console.log("productDetail", newArr);
  res.status(400).send({ Success: "you are succcess ", newArr });
};
// ***************REgistering the Fields of Schema*************
const graphLookupTable = async (req, res) => {
  try {
    // const register = await graphTable.create({...req.body})
    // const register = await nearPort.create({...req.body})
    const register = await nearerPort.create({ ...req.body });
    const userData = await register.save();
    res.send({ message: "You are registered", userData });
  } catch (error) {
    res.send("Some error occured");
  }
};
// ###################### GraphLookup Implementation ###########################
const graphLookup = async (req, res) => {
  const data_table = await nearPort.aggregate([
    // {$match:{reportsTo:"Navneet"}},
    // {
    //   $graphLookup: {
    //     from: "graphlookups",
    //     startWith:"$reportsTo",
    //     connectFromField: "reportsTo",
    //     connectToField:"reportsTo",
    //     as: "reportingHierarchy"

    //   }
    // }

    //first schema  user
    //key name,email,phone

    //second schema userDetails
    //key username,address,isDeleted:true/false
    // common name
    // {
    //   $graphLookup: {
    //     from: "userDetails",
    //     startWith:"$name",
    //     connectFromField: "name",
    //     connectToField:"username",
    //     restrictSearchWithMatch:{isDeleted: false},
    //     as: "userDetails"

    //   }
    // }

    // {$match:{nearestAirports:"Hyderabad"}},
    {
      $graphLookup: {
        from: "nearerports",
        startWith: "$nearestAirports",
        connectFromField: "connects",
        connectToField: "airport",
        maxDepth: 2,
        depthField: "numConnections",
        as: "destination",
      },
    },
  ]);

  let newArr = [];
  data_table.forEach((dd) => {
    if (dd.destination.length != 0) {
      newArr.push(dd);
    }
  });

  if (data_table) {
    res.send({ message: "you are successs", newArr });
  } else {
    res.send(error);
  }
};
// ######################### implementation of addtoset ####################
const setToPart = async (req, res) => {
  // const setdata = await AddToData.create({...req.body})
  const setdata = await StateSetData.create({ ...req.body });
  const register = await setdata.save();
  if (register) {
    res.send({ message: "Successfully added", register });
  } else {
    res.send(error);
  }
};
const DataSetTO = async (req, res) => {
  // const dataSet = await AddToData.aggregate(
  const dataSet = await StateSetData.aggregate([
    //   {
    //     $group:
    //     {
    //       _id: {day:  {$dayOfYear:"$date"},year:{$year:"$date"}},
    //       itemSold:{$addToSet: "$item"}

    //     }
    //   }

    {
      $setWindowFields: {
        partitionBy: "$state",
        sortBy: { orderDate: 1 },
        output: {
          cakeTypesForState: {
            // $addToSet: "$type",
            // ***************|Here $ push is also implemented|*******************
            $push: "$quantity",
            window: {
              documents: ["unbounded", "current"],
            },
          },
        },
      },
    },
  ]);
  if (dataSet) {
    res.send({ message: "Successfully", dataSet });
  } else {
    res.send({ error, message: "Something Went wrong" });
  }
};
// const artist = async (req,res) => {
//   const artists = Artists.insertMany([
//     { "_id" : 1, "last_name" : "Bernard", "first_name" : "Emil", "year_born" : 1868, "year_died" : 1941, "nationality" : "France" },
//   { "_id" : 2, "last_name" : "Rippl-Ronai", "first_name" : "Joszef", "year_born" : 1861, "year_died" : 1927, "nationality" : "Hungary" },
//   { "_id" : 3, "last_name" : "Ostroumova", "first_name" : "Anna", "year_born" : 1871, "year_died" : 1955, "nationality" : "Russia" },
//   { "_id" : 4, "last_name" : "Van Gogh", "first_name" : "Vincent", "year_born" : 1853, "year_died" : 1890, "nationality" : "Holland" },
//   { "_id" : 5, "last_name" : "Maurer", "first_name" : "Alfred", "year_born" : 1868, "year_died" : 1932, "nationality" : "USA" },
//   { "_id" : 6, "last_name" : "Munch", "first_name" : "Edvard", "year_born" : 1863, "year_died" : 1944, "nationality" : "Norway" },
//   { "_id" : 7, "last_name" : "Redon", "first_name" : "Odilon", "year_born" : 1840, "year_died" : 1916, "nationality" : "France" },
//   { "_id" : 8, "last_name" : "Diriks", "first_name" : "Edvard", "year_born" : 1855, "year_died" : 1930, "nationality" : "Norway" }
// ])
// if(artists){
//   const user = await artists.save();
//   res.send({message:"message",user});
// }
// else
// res.send(err);
// }
// ################| Aggregate Merge is Used here |################################# 
const MergeDataSet = async (req, res) => {
  const userData = await MergeData.create({ ...req.body });
  const User = await userData.save();

if (userData) {
  res.send({ message: "this is data ", User })
} else {
  res.send("Some error occured");
}
}
const DataInform = async(req,res) =>{
  const InfoMerg = await MergeData.aggregate([
    {$group:{_id:{fiscalYear:"$fiscalYear",dept:"$dept"},salaries:{$sum:"$salaries"}}},
    // {$count:"item"},
    // {$count:"employee"},

    {$merge:{into:{db:"reporting", coll:"budgets"},on:"_id", whenMatched:"replace",whenNotMatched:"insert"}},
  ])

if(InfoMerg)
res.send({message:"Merged Data",InfoMerg})
else
res.send("Merged Data not found");
}
module.exports = {
  loadRegister,
  insertUser,
  verifyMail,
  changePassword,
  forgot_Password,
  UpdatedPassword,
  securePassword,
  loginUser,
  logout,
  dataFilter,
  insertProduct,
  graphLookupTable,
  graphLookup,
  setToPart,
  DataSetTO,
  MergeDataSet,
  DataInform,
  DataAggregat,
  // artist,

  SearchBar,
  // searchDashboard,
  IssueTable,
  getData,
  Update_Data,
  deleteUser,
};
