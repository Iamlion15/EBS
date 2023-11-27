const vendorModel = require("../model/vendorModel")
const vendorItems = require("../model/vendorItems")


exports.saveVendor = async (req, res) => {
    const newVendor = new vendorModel(req.body);
    try {
        await newVendor.save();
        res.status(200).json({ message: "successful vendor" })
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err })
    }
}


exports.saveVendorItem = async (req, res) => {
    console.log(req.body)
    const newVendorItem = new vendorItems(req.body);
    try {
        await newVendorItem.save();
        res.status(200).json({ message: "successful vendor" })
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err })
    }
}

exports.getVendors = async (req, res) => {
    try {
        const vendors = await vendorModel.find();
        res.status(200).json(vendors)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
exports.getVendorItems = async (req, res) => {
    const vendor=req.params.vendor
    try {
        const vendorItems = await vendorModel.find({owner:vendor});
        res.status(200).json(vendorItems)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}


exports.updateVendor = async (req, res) => {
    try {
        const vendor = await vendorModel.findOne({ _id: req.body._id });
        if (!vendor) {
            return res.status(404).json({ message: 'vendor not found' });
        }
        vendor.firstname = req.body.firstname;
        vendor.lastname = req.body.lastname;
        vendor.phone = req.body.phone;
        vendor.email = req.body.email;
        await vendor.save();
        res.status(200).json({ message: "Successfully updated vendor" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        await vendorModel.findOneAndDelete({ _id: req.body._id });
        res.status(200).json({ message: "successfully deleted vendor" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

exports.updateVendorItem = async (req, res) => {
    try {
        const vendorItem = await vendorItems.findOne({ _id: req.body._id });
        if (!vendorItem) {
            return res.status(404).json({ message: 'vendor not found' });
        }
        await vendorItems.findOneAndUpdate(vendorItem._id,req.body);
        res.status(200).json({ message: "Successfully updated vendor item" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteVendorItem = async (req, res) => {
    try {
        await vendorItems.findOneAndDelete({ _id: req.body._id });
        res.status(200).json({ message: "successfully deleted vendor item" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}