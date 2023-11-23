const express=require("express")
const {sendMessage,getMessagesBetweenUsers}=require("../controller/messageController")
const checkAuthentication=require("../middlewares/checkAuthentication")
const { checkEBSAuthorization,checkFINANCEAuthorization,checkSTAFFAuthorization,checkApproversAuthorization,  } = require("../middlewares/checkAuthorization")

const router=express.Router();

router.post("/send",checkAuthentication,sendMessage)
router.post('/getchat',checkAuthentication,getMessagesBetweenUsers)




module.exports=router;
