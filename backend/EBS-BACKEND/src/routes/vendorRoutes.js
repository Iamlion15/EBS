const express=require("express")
const {getVendors,deleteVendor,deleteVendorItem,saveVendor,saveVendorItem,updateVendor,updateVendorItem,getVendorItems,updateVendorContract,terminateVendorContract}=require("../controller/vendorController")
const checkAuthentication=require("../middlewares/checkAuthentication")
const uploadDocument = require("../middlewares/uploadDocument")
const {checkVendorContracts}=require("../controller/statisticsController")
const { checkEBSAuthorization,checkFINANCEAuthorization,  } = require("../middlewares/checkAuthorization")

const router=express.Router();

router.post("/save",checkAuthentication,checkEBSAuthorization,uploadDocument,saveVendor)
router.post("/save/vendoritems/:vendorid",checkAuthentication,checkEBSAuthorization,saveVendorItem)
router.post('/update',checkAuthentication,checkEBSAuthorization,updateVendor)
router.get('/update/vendoritem',checkAuthentication,checkEBSAuthorization,updateVendorItem)
router.delete("/vendor/", checkAuthentication,checkEBSAuthorization, deleteVendor);
router.delete("/vendor/vendoritem", checkAuthentication,checkEBSAuthorization, deleteVendorItem);
router.get("/vendors",checkAuthentication,checkEBSAuthorization,getVendors)
router.get("/vendoritems/:vendor",checkAuthentication,checkEBSAuthorization,getVendorItems)
router.get("/checkvendorcontract",checkAuthentication,checkEBSAuthorization,checkVendorContracts)
router.post("/updatecontract",checkAuthentication,checkEBSAuthorization,updateVendorContract)
router.post("/terminate/:vendor",checkAuthentication,checkEBSAuthorization,uploadDocument,terminateVendorContract)


module.exports=router;

