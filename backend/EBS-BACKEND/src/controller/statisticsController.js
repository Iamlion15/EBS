const itemrequest = require("../model/ItemRequest")
const vendorModel = require("../model/vendorModel")
const invoiceModel = require("../model/invoiceModel")

exports.itemStatistics = async (req, res) => {
    try {
        const approvals = await itemrequest.find({});

        let approvedCount = 0;
        let pendingCount = 0;
        let canceledCount = 0;
        let underReviewCount = 0;

        for (const approval of approvals) {
            const hasEBSApproved = approval.EBS_Approval.approved;
            const hasFinanceApproved = approval.Finance_Approval.approved;
            const hasAnyApprovalTime = approval.EBS_Approval.timeOfApproval || approval.Finance_Approval.timeOfApproval
            const status = approval.status === "Approved"
            const PendingStatus = approval.status === "Pending"
            const RejectedStatus = approval.status === "Rejected"

            if (hasEBSApproved && hasFinanceApproved && status) {
                approvedCount++;
            } else if (hasEBSApproved && !hasFinanceApproved && PendingStatus) {
                underReviewCount++;
            } else if (RejectedStatus) {
                canceledCount++;
            } else {
                if (!hasEBSApproved && !hasFinanceApproved && PendingStatus) {
                    pendingCount++;
                }
            }
        }

        res.status(200).json({
            "approved": approvedCount,
            "underReview": underReviewCount,
            "pending": pendingCount,
            "canceled": canceledCount
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({ "error": err });
    }
}


exports.CountDocumentsByEBSpproval = async (req, res) => {
    try {
        const countApproved = await itemrequest.countDocuments({ 'EBS_Approval.approved': true });
        const countNotApproved = await itemrequest.countDocuments({ 'EBS_Approval.approved': false, status: "Pending" });
        const countRejected = await itemrequest.countDocuments({ 'EBS_Approval.approved': false, status: "Rejeceted" });
        res.status(200).json({
            approved: countApproved || 0,
            pending: countNotApproved || 0,
            rejected: countRejected || 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.CountDocumentsByFinanceApproval = async (req, res) => {
    try {
        const countApproved = await itemrequest.countDocuments({ 'Finance_Approval.approved': true });
        const countNotApproved = await itemrequest.countDocuments({ 'EBS_Approval.approved': true, 'Finance_Approval.approved': false, status: "Pending" });
        const countRejected = await itemrequest.countDocuments({ 'EBS_Approval.approved': true, 'Finance_Approval.approved': false, status: "Rejected" });
        res.status(200).json({
            approved: countApproved || 0,
            pending: countNotApproved || 0,
            rejected: countRejected || 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};



exports.checkVendorContracts = async (req, res) => {
    try {
        const today = new Date();
        const threeDaysFromToday = new Date(today);
        threeDaysFromToday.setDate(today.getDate() + 3);
        // Find all vendors
        const vendors = await vendorModel.find();
        let count = 0;
        // Array to store IDs that meet the condition
        const idsToNotify = [];
        // Iterate through each vendor
        vendors.forEach((vendor) => {
            // Check if the end date is within 3 days from today
            if (vendor.contract.endDate > today && vendor.contract.endDate <= threeDaysFromToday) {
                // Add the vendor's ID to the array
                idsToNotify.push(vendor);
                count = count + 1;
                // Implement your logic to send a message here if needed
            }
        });
        res.status(200).json({ idsToNotify, count });
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};


exports.ApprovedReportByEBS = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required.' });
        }

        const itemsApproved = await itemrequest.find({
            'EBS_Approval.approved': true,
            'EBS_Approval.timeOfApproval': {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        }).populate("owner").populate("item");

        res.status(200).json({
            items: itemsApproved,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.RejectedReportByEBS = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required.' });
        }

        const itemsApproved = await itemrequest.find({
            'rejectionDetails.rejectedBy':'EBS',
            'rejectionDetails.rejectedOn': {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        }).populate("owner").populate("item");

        res.status(200).json({
            items: itemsApproved,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.PendingReportByEBS = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required.' });
        }
        const itemsApproved = await itemrequest.find({
            'EBS_Approval.approved': false,
            status: "Pending",
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            }
        }).populate("owner").populate("item");
        res.status(200).json({
            items: itemsApproved,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getInvoices = async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
        const items = await invoiceModel.find({
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            }
        })
            .populate("vendoritem")
            .populate("requestedBy")
            .populate("financeApprovedBy")
            .populate("EBSApprovedBy")
        res.status(200).json(items)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}


exports.PendingReportByFINANCE = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required.' });
        }
        const itemsApproved = await itemrequest.find({
            'EBS_Approval.approved': true, 'Finance_Approval.approved': false,
            status: "Pending",
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            }
        }).populate("owner").populate("item");
        res.status(200).json({
            items: itemsApproved,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.RejectedReportByFINANCE = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required.' });
        }
        const itemsApproved = await itemrequest.find({
            'EBS_Approval.approved': true, 'Finance_Approval.approved': false,
            status: "Rejected",
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            }
        }).populate("owner").populate("item");
        res.status(200).json({
            items: itemsApproved,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.ApprovedReportByFINANCE = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required.' });
        }
        const itemsApproved = await itemrequest.find({
            'Finance_Approval.approved': true,
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            }
        }).populate("owner").populate("item");
        res.status(200).json({
            items: itemsApproved,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

