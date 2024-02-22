var jwt = require('jsonwebtoken');
const JWT_SECRET = "ABCDEFGHIJKLMNOPQRS";
const fetchuser = (req,res,next) => {
    try{
        const token = req.header('auth-token')

        if(!token){
            res.status(402).send({error:"Please  authenticate valid token",message:"you are here"});
        }
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next()
    }catch(error){
        res.status(401).send({error:"Please authenticate using valid token",message:"You are in catch block"})
        console.log(error);
    }
}
module.exports.getToken = (data) => 
    jwt.sign(data, process.env.SECRET_KEY,{
        expiresIn: "30 days" }); 
    

module.exports = fetchuser;