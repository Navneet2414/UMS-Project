const mongoose = require("mongoose");
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/user_management_system") 
console.log('connected to mongo');



 const express = require("express");
 const app = express();
 const bodyParser = require('body-Parser');
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(bodyParser.json());


 const user_Route = require('./routes/userRoutes');
 const router = require('./routes/user');
 app.use('/', user_Route);
 app.use("/multer",router);

 app.listen(3000,function(){
    console.log("Server is running at 3000....");
   console.log(`Server listening at https://localhost:${port}`);
 });