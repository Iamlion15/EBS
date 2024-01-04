const router = require("express").Router();
const checkAuthentication = require("../middlewares/checkAuthentication")

const {PendingReportByEBS,ApprovedReportByEBS,PendingReportByFINANCE,ApprovedReportByFINANCE,getInvoices,RejectedReportByEBS,RejectedReportByFINANCE}=require("../controller/statisticsController")
const { checkEBSAuthorization,checkFINANCEAuthorization,checkSTAFFAuthorization,checkApproversAuthorization,  } = require("../middlewares/checkAuthorization")



router.post("/ebs/pendingreport", checkAuthentication, checkEBSAuthorization, PendingReportByEBS)
router.post("/ebs/approvedreport", checkAuthentication, checkEBSAuthorization, ApprovedReportByEBS)
router.post("/finance/pendingreport", checkAuthentication, checkFINANCEAuthorization, PendingReportByFINANCE)
router.post("/finance/approvedreport", checkAuthentication, checkFINANCEAuthorization, ApprovedReportByFINANCE)
router.post("/finance/invoicereport", checkAuthentication, checkFINANCEAuthorization, getInvoices)
router.post("/finance/rejectedreport", checkAuthentication, checkFINANCEAuthorization, RejectedReportByFINANCE)
router.post("/ebs/rejectedreport", checkAuthentication, checkEBSAuthorization, RejectedReportByEBS)

module.exports=router