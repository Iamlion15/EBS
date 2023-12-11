const router = require("express").Router();
const checkAuthentication = require("../middlewares/checkAuthentication")

const {PendingReportByEBS,ApprovedReportByEBS,PendingReportByFINANCE,ApprovedReportByFINANCE}=require("../controller/statisticsController")
const { checkEBSAuthorization,checkFINANCEAuthorization,checkSTAFFAuthorization,checkApproversAuthorization,  } = require("../middlewares/checkAuthorization")



router.post("/ebs/pendingreport", checkAuthentication, checkEBSAuthorization, PendingReportByEBS)
router.post("/ebs/approvedreport", checkAuthentication, checkEBSAuthorization, ApprovedReportByEBS)
router.post("/finance/pendingreport", checkAuthentication, checkFINANCEAuthorization, PendingReportByFINANCE)
router.post("/finance/approvedreport", checkAuthentication, checkFINANCEAuthorization, ApprovedReportByFINANCE)

module.exports=router