const DocumentApproval = require("../model/documentApproval")

exports.documentStatistics = async (req, res) => {
    try {
        const approvals = await DocumentApproval.find();

        let approvedCount = 0;
        let pendingCount = 0;
        let canceledCount = 0;
        let underReviewCount = 0;

        for (const approval of approvals) {
            const hasRABApproved = approval.RAB_Approval.approved;
            const hasRICAApproved = approval.RICA_Approval.approved;
            const hasRSBApproved = approval.RSB_Approval.approved;
            const hasAnyApprovalTime = approval.RAB_Approval.timeOfApproval || approval.RICA_Approval.timeOfApproval || approval.RSB_Approval.timeOfApproval;

            if (hasRABApproved && hasRICAApproved && hasRSBApproved) {
                approvedCount++;
            } else if (hasRABApproved && hasRSBApproved && !hasRICAApproved) {
                underReviewCount++;
            } else if (!hasRABApproved && !hasRICAApproved && !hasRSBApproved) {
                if (hasAnyApprovalTime) {
                    canceledCount++;
                } else {
                    pendingCount++;
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


exports.CountDocumentsByRABApproval = async (req, res) => {
    try {
        const countApproved = await DocumentApproval.countDocuments({ 'RAB_Approval.approved': true });
        const countNotApproved = await DocumentApproval.countDocuments({ 'RAB_Approval.approved': false });

        res.status(200).json({
            approved: countApproved || 0,
            pending: countNotApproved || 0,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.CountDocumentsByRSBApproval = async (req, res) => {
    try {
        const countApproved = await DocumentApproval.countDocuments({ 'RSB_Approval.approved': true });
        const countNotApproved = await DocumentApproval.countDocuments({ 'RAB_Approval.approved': true, 'RSB_Approval.approved': false });

        res.status(200).json({
            approved: countApproved || 0,
            pending: countNotApproved || 0,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.CountDocumentsByRICAApproval = async (req, res) => {
    try {
        const countApproved = await DocumentApproval.countDocuments({ 'RICA_Approval.approved': true });
        const countNotApproved = await DocumentApproval.countDocuments({
            'RAB_Approval.approved': true,
            'RSB_Approval.approved': true,
            'RICA_Approval.approved': false
        });

        res.status(200).json({
            approved: countApproved || 0,
            pending: countNotApproved || 0,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getDocumentInRange = async (req, res) => {
    const { startDate, endDate, organisation } = req.body;
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (organisation === "RAB") {
            const count = await DocumentApproval.countDocuments({
                'RAB_Approval.timeOfApproval': { $gte: start, $lte: end }
            });
            const documents = await DocumentApproval.find({
                'RAB_Approval.timeOfApproval': { $gte: start, $lte: end }
            }).populate("owner").populate("document");

            res.status(200).json({ count, documents });
        }
        else if (organisation === "RSB") {
            const count = await DocumentApproval.countDocuments({
                'RSB_Approval.timeOfApproval': { $gte: start, $lte: end }
            });
            const documents = await DocumentApproval.find({
                'RSB_Approval.timeOfApproval': { $gte: start, $lte: end }
            }).populate("owner").populate("document");

            res.status(200).json({ count, documents });
        }
        else {
            if (organisation === "RICA") {
                const count = await DocumentApproval.countDocuments({
                    'RICA_Approval.timeOfApproval': { $gte: start, $lte: end }
                });
                const documents = await DocumentApproval.find({
                    'RICA_Approval.timeOfApproval': { $gte: start, $lte: end }
                }).populate("owner").populate("document");
                res.status(200).json({ count, documents });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getPendingDocumentInRange = async (req, res) => {
    const { startDate, endDate, organisation } = req.body;
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (organisation === "RAB") {
            const count = await DocumentApproval.countDocuments({
                'RAB_Approval.approved': false,
                createdAt: { $gte: start, $lte: end }
            });
            const documents = await DocumentApproval.find({
                'RAB_Approval.approved': false,
                createdAt: { $gte: start, $lte: end }
            }).populate("owner").populate("document");
            res.status(200).json({ count, documents });
        }
        else if (organisation === "RSB") {
            const count = await DocumentApproval.countDocuments({
                'RAB_Approval.approved': true,
                'RSB_Approval.approved': false,
                createdAt: { $gte: start, $lte: end }
            });
            const documents = await DocumentApproval.find({
                'RAB_Approval.approved': false,
                createdAt: { $gte: start, $lte: end }
            }).populate("owner").populate("document");
            res.status(200).json({ count, documents });
        }
        else {
            if (organisation === "RICA") {
                const count = await DocumentApproval.countDocuments({
                    'RAB_Approval.approved': true,
                    'RSB_Approval.approved': true,
                    'RICA_Approval.approved': false,
                    createdAt: { $gte: start, $lte: end }
                });
                const documents = await DocumentApproval.find({
                    'RAB_Approval.approved': false,
                    createdAt: { $gte: start, $lte: end }
                }).populate("owner").populate("document");
                res.status(200).json({ count, documents });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};




