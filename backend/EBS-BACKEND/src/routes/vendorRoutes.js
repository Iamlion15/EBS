const express=require("express")
const {getVendors,deleteVendor,deleteVendorItem,saveVendor,saveVendorItem,updateVendor,updateVendorItem,getVendorItems}=require("../controller/vendorController")
const checkAuthentication=require("../middlewares/checkAuthentication")
const { checkEBSAuthorization,checkFINANCEAuthorization,  } = require("../middlewares/checkAuthorization")

const router=express.Router();

router.post("/save",checkAuthentication,checkEBSAuthorization,saveVendor)
router.post("/save/vendoritems/:vendorid",checkAuthentication,checkEBSAuthorization,saveVendorItem)
router.post('/update',checkAuthentication,checkEBSAuthorization,updateVendor)
router.get('/update/vendoritem',checkAuthentication,checkEBSAuthorization,updateVendorItem)
router.delete("/vendor/", checkAuthentication,checkEBSAuthorization, deleteVendor);
router.delete("/vendor/vendoritem", checkAuthentication,checkEBSAuthorization, deleteVendorItem);
router.get("/vendors",checkAuthentication,checkEBSAuthorization,getVendors)
router.get("/vendoritems/:vendor",checkAuthentication,checkEBSAuthorization,getVendorItems)




module.exports=router;

