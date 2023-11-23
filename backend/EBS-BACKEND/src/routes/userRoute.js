const express=require("express")
const {addUser,getUsers,loginUser,updateUser,checkPassword,updateUserPassword}=require("../controller/userController")
const checkAuthentication=require("../middlewares/checkAuthentication")

const router=express.Router();

router.post("/signup",addUser)
router.post("/login",loginUser)
router.post("/update",checkAuthentication,updateUser)
router.post("/checkpassword",checkAuthentication,checkPassword)
router.post("/updatepassword",checkAuthentication,updateUserPassword)



module.exports=router;