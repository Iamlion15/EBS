const itemrequest = require("../model/ItemRequest")

exports.itemStatistics = async (req, res) => {
    try {
        const approvals = await itemrequest.find();

        let approvedCount = 0;
        let pendingCount = 0;
        let canceledCount = 0;
        let underReviewCount = 0;

        for (const approval of approvals) {
            const hasEBSApproved = approval.EBS_Approval.approved;
            const hasFinanceApproved = approval.Finance_Approval.approved;
            const hasAnyApprovalTime = approval.EBS_Approval.timeOfApproval || approval.Finance_Approval.timeOfApproval

            if (hasEBSApproved && hasFinanceApproved) {
                approvedCount++;
            } else if (hasEBSApproved && !hasFinanceApproved ) {
                underReviewCount++;
                pendingCount++;
            } else if (!hasEBSApproved && !hasFinanceApproved) {
                if (hasAnyApprovalTime) {
                    canceledCount++;
                }
            } else {
                pendingCount++;
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
        const countNotApproved = await itemrequest.countDocuments({ 'Finance_Approval.approved': false });
        res.status(200).json({
            approved: countApproved || 0,
            pending: countNotApproved || 0,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.CountDocumentsByFinanceApproval = async (req, res) => {
    try {
        const countApproved = await itemrequest.countDocuments({ 'EBS_Approval.approved': true });
        const countNotApproved = await itemrequest.countDocuments({ 'Finance_Approval.approved': true});
        res.status(200).json({
            approved: countApproved || 0,
            pending: countNotApproved || 0,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

