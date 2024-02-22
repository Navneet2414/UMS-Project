const express = require("express");

const user_route = express();
user_route.set('view engine','ejs');
user_route.set('views','./views/users');
const bodyParser = require('body-Parser');
// const validation = 
 user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}))

const multer = require("multer");
var fs = require("fs")
const path = require("path");
const storage =  multer.diskStorage({
    destination:function(req,file,cb){
        // cb(null,path.join(__dirname,"./public/userImage"));
        cb(null,"./public/userImage");

    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);

    }
})

const upload = multer({storage:storage});
const userController = require("../controllers/userController");
const emailService = require("../controllers/emailService")
const message = require("../controllers/userMessage");
const Auth = require("../common/authenticate");
const fetchuser = require("../middleware/fetchuser")
user_route.post("/register",userController.loadRegister);
user_route.post("/imageupload",upload.single("image"),userController.insertUser);
user_route.post("/registered",userController.insertUser);
// user_route.post("/imageupload",userController.insertUser);
user_route.get("/verify", userController.verifyMail);
// user_route.get("/message",message.sendSMSMessage);
// user_route.post("/loginpage",userController.loginPage);
user_route.post("/loginUser",userController.loginUser);
user_route.post("/logOut",fetchuser,userController.logout);
user_route.post("/changePassword",fetchuser,userController.changePassword);
// user_route.post("/emailsend",userController.emailSend)
user_route.post("/ForgotPassword",userController.forgot_Password);
user_route.post("/UpdatedPassword",userController.UpdatedPassword);
// user_route.post("/VerifyOTP",fetchuser,userController.verifyotp);
// user_route.post("/registation",userController.registered);
user_route.get("/search",userController.SearchBar);
//user_route.get("/searchDashboard/:key",userController.searchDashboard);

// user_route.get("/emailverify", userController.sendVerifyMail);
// user_route.post("/verifyEmail",emailService.send)
user_route.post("/IssueTable",userController.IssueTable);
user_route.get("/FetchData", userController.getData);
user_route.put("/userUpdate:id",userController.Update_Data);
user_route.delete("/DeleteUser:id",userController.deleteUser)
user_route.get("/Aggregate",userController.DataAggregat);
user_route.post("/productTable",userController.insertProduct);

user_route.get("/datainserted",userController.dataFilter);
user_route.post("/graphdata",userController.graphLookupTable);
user_route.get("/graphdataLookup",userController.graphLookup );
user_route.post("/setdata",userController.setToPart);
user_route.get("/settodataelem",userController.DataSetTO);
// user_route.get("/artistsdata",userController.artist);
user_route.post("/mergedData",userController.MergeDataSet)
user_route.get("/DataInfo",userController.DataInform)

module.exports = user_route;
