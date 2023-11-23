const router = require("express").Router();
const checkAuthentication = require("../middlewares/checkAuthentication")
const uploadDocument = require("../middlewares/uploadDocument")
// const {documentStatistics,CountDocumentsByRABApproval,CountDocumentsByRSBApproval,CountDocumentsByRICAApproval,getDocumentInRange,getPendingDocumentInRange}=require("../controller/statisticsController")
const { checkEBSAuthorization,checkFINANCEAuthorization,checkSTAFFAuthorization,checkApproversAuthorization,  } = require("../middlewares/checkAuthorization")


const { addItem,ReviewRequest,deleteItem,getItems,getOneItem,updateItem } = require("../controller/itemController")


router.post("/save", checkAuthentication, checkSTAFFAuthorization,uploadDocument, addItem)
router.post("/approve", checkAuthentication, checkApproversAuthorization, ReviewRequest)
router.post("/update", checkAuthentication, checkSTAFFAuthorization,uploadDocument, updateItem)
router.delete("/delete/:id", checkAuthentication, checkSTAFFAuthorization, deleteItem)
router.get("/getall", checkAuthentication, getItems)
router.get("/get/:id", checkAuthentication, getOneItem);
// router.get("/statistics",checkAuthentication,checkPRODUCERAuthorization,documentStatistics)
// router.get("/rabstatistics",checkAuthentication,checkRAButhorization,CountDocumentsByRABApproval)
// router.get("/rsbstatistics",checkAuthentication,checkRSButhorization,CountDocumentsByRSBApproval)
// router.get("/ricastatistics",checkAuthentication,checkRICAAuthorization,CountDocumentsByRICAApproval)
// router.post("/countdocumentsinrange",checkAuthentication,checkApproversAuthorization,getDocumentInRange)
// router.post("/countpendingdocumentsinrange",checkAuthentication,checkApproversAuthorization,getPendingDocumentInRange)


module.exports = router