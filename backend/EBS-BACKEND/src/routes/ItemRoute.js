const router = require("express").Router();
const checkAuthentication = require("../middlewares/checkAuthentication")
const uploadDocument = require("../middlewares/uploadDocument")
const {itemStatistics,CountDocumentsByEBSpproval,CountDocumentsByFinanceApproval}=require("../controller/statisticsController")
const { checkEBSAuthorization,checkFINANCEAuthorization,checkSTAFFAuthorization,checkApproversAuthorization,  } = require("../middlewares/checkAuthorization")


const { addItem,ReviewRequest,deleteItem,getItems,getOneItem,updateItem,EBSReviewRequest } = require("../controller/itemController")


router.post("/save", checkAuthentication, checkSTAFFAuthorization,uploadDocument, addItem)
router.post("/approve", checkAuthentication, checkApproversAuthorization, ReviewRequest)
router.post("/ebsapprove/:vendoritem", checkAuthentication, checkApproversAuthorization, EBSReviewRequest)
router.post("/update", checkAuthentication, checkSTAFFAuthorization,uploadDocument, updateItem)
router.delete("/delete/:id", checkAuthentication, checkSTAFFAuthorization, deleteItem)
router.get("/getall", checkAuthentication, getItems)
router.get("/financegetall", checkAuthentication, getItems)
router.get("/get/:id", checkAuthentication, getOneItem);
router.get("/statistics",checkAuthentication,checkSTAFFAuthorization,itemStatistics)
router.get("/ebsstatistics",checkAuthentication,checkEBSAuthorization,CountDocumentsByEBSpproval)
router.get("/financestatistics",checkAuthentication,checkFINANCEAuthorization,CountDocumentsByFinanceApproval)

module.exports = router