const itemModel = require("../model/ItemModel")
const itemRequestModel = require("../model/ItemRequest")
const vendorItemModel = require("../model/vendorItems")
const vendorModel = require("../model/vendorModel")
const path = require("path")
const sendMail = require("../helpers/MailConfig")



exports.addItem = async (req, res) => {
    let fileLocation;
    if (req.file) {
        fileLocation = path.resolve(req.file.path)
    } else {
        return res.status(400).json({ error: 'No file was uploaded' });
    }
    const newItem = new itemModel({
        ItemName: req.body.ItemName,
        quantity: req.body.quantity,
        whenNeeded: req.body.whenNeeded,
        itemType: req.body.itemType,
        purpose: req.body.purpose,
        fileLocation: fileLocation
    });
    try {
        const itemData = await newItem.save();
        const itemRequestApproval = new itemRequestModel({
            owner: req.user._id,
            item: itemData._id,
            EBS_Approval: {
                approved: false
            },
            Finance_Approval: {
                approved: false
            },
        })
        await itemRequestApproval.save()
        return res.status(200).json({ message: "successfully saved document" })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err })
    }
}



exports.updateItem = async (req, res) => {
    try {
        const itemRequestApproval = await itemRequestModel.findOne({ _id: req.body.id });
        if (!itemRequestApproval) {
            return res.status(404).json({ message: 'document not found' });
        }
        const item = await itemModel.findOne({ _id: itemRequestApproval.item })
        // Update the document with the new data
        item.ItemName = req.body.ItemName;
        item.quantity = req.body.quantity;
        item.whenNeeded = req.body.whenNeeded;
        item.itemType = req.body.itemType
        item.purpose = req.body.purpose;
        if (req.file) {
            fileLocation = path.resolve(req.file.path)
            item.fileLocation = fileLocation;
        }
        const updateItem = await item.save();
        res.status(200).json({ message: "Successfully updated user" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await itemRequestModel.find().populate("item").populate("owner");
        res.status(200).json(items)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

exports.getFinanceItems = async (req, res) => {
    try {
        const items = await itemRequestModel.find().populate("item").populate("owner").populate("vendoritem");
        res.status(200).json(items)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

exports.getOneItem = async (req, res) => {
    const id = req.params.id
    try {
        const itemApproval = await itemRequestModel.findOne({ _id: id }).populate("item");
        const itemDocsUrl = itemApproval.item.fileLocation;
        res.status(200).sendFile(itemDocsUrl)
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err })
    }
}

exports.deleteItem = async (req, res) => {
    const id = req.params.id
    try {
        const itemApproval = itemRequestModel.findOne({ _id: id })
        const item = itemModel.findOne({ _id: itemApproval.item })
        await itemRequestModel.findOneAndDelete({ _id: id })
        await itemModel.findOneAndDelete({ _id: item._id });
        res.status(200).json({ "message": "succesfully deleted" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
exports.ReviewRequest = async (req, res) => {
    try {
        const reviewer = req.body.reviewer;
        const item = await itemRequestModel.findOne({ _id: req.body.id });
        if (!item) {
            return res.status(404).json({ message: 'item not found' });
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        item.Finance_Approval.approved = true
        item.Finance_Approval.timeOfApproval = formattedDate
        await item.save();
        res.status(200).json({ message: "Successfully reviewed item" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}



exports.EBSReviewRequest = async (req, res) => {
    try {
        const vendor = req.params.vendoritem
        const reviewer = req.body.reviewer;
        const item = await itemRequestModel.findOne({ _id: req.body.id });
        const vendor_item = await vendorItemModel.findOne({ _id: vendor });
        const vendor_owner = await vendorModel.findOne({ _id: vendor_item.owner })
        if (!item) {
            return res.status(404).json({ message: 'item not found' });
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        item.EBS_Approval.approved = true
        item.EBS_Approval.timeOfApproval = formattedDate
        item.vendoritem = vendor
        item.reviewer=reviewer._id;
        const vendorName = vendor_owner.firstname + " " + vendor_owner.lastname
        const deliveryDetails = vendor_item.itemName
        await sendMail(vendor_owner.email, vendorName, deliveryDetails)
        await item.save();
        res.status(200).json({ message: "Successfully reviewed item" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}


