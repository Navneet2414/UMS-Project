const router = require("express").Router();
const Controller = require('../controllers/user');
const Auth = require('../common/authenticate');
// const validation = require('../controllers/validation')
// const bodyParser = require('body-parser');
var bodyParser = require('body-parser')
 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({extended:true}))
const multer = require("multer");

            
            const storage =  multer.diskStorage({
                
                destination:function(req,file,cb){
                    
                    cb(null,"./public/upload");
                    
                },
                filename:function(req,file,cb){
                    const name = Date.now()+'-'+file.originalname;
                    cb(null,name);
                    
                    // if(req.file){
                        //     console.log("file uploading");
                        // }
                        // if(!req.file){
            
        //     console.log("Some error occured");
        // }
        // else{
        //     console.log("not uploading");
        // }
    }
});

// const upload = multer({storage:storage});
const upload = multer({ storage});
// const upload = multer({ storage: storage}).array("files",6);
//  const upload = multer({ storage }).array("files",6);

router.post("/uploadFile", upload.single("file"),Controller.Register);
router.post("/Registration",Controller.Register);
// router.get("/getProfilebytoken",Auth.verify('user'),Controller.getProfile);
router.get("/getProfile",Controller.getProfile);
// router.post("/userProfile", upload.single("file"),Controller.userProfile);
router.put("/updateprofile",Auth.verify('user'),Controller.updateProfile);
 router.post("/uploadDocument",upload.array('file'));
 

module.exports = router;