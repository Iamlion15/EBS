const vendorModel = require("../model/vendorModel")
const vendorItems = require("../model/vendorItems")
const path = require("path")


exports.saveVendor = async (req, res) => {
    let fileLocation;
    if (req.file) {
        fileLocation = path.resolve(req.file.path)
    } else {
        return res.status(400).json({ error: 'No file was uploaded' });
    }
    const newVendor = new vendorModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        contract: {
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            fileLocation: fileLocation
        }
    });
    console.log(newVendor);
    try {
        const vendor = await newVendor.save();
        res.status(200).json(vendor)
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err })
    }
}

exports.saveVendorItem = async (req, res) => {
    try {
        const vendorid = req.params.vendorid;
        // Assuming req.body is an array of items
        const itemsData = req.body;

        for (let i = 0; i < itemsData.length; i++) {
            const newVendorItem = new vendorItems({
                category: itemsData[i].category,
                itemName: itemsData[i].itemName,
                itemPrice: itemsData[i].itemPrice,
                properties: itemsData[i].properties,
                owner: vendorid
            });
            
            await newVendorItem.save();
        }
        res.status(200).json({ message: "Successful vendor item creation" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};


exports.getVendors = async (req, res) => {
    try {
        const vendors = await vendorModel.find();
        res.status(200).json(vendors)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
exports.getVendorItems = async (req, res) => {
    const vendor = req.params.vendor
    try {
        const items = await vendorItems.find({ owner: vendor });
        res.status(200).json(items)
    } catch (err) {
        console.log(err);
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
        await vendorItems.findOneAndUpdate(vendorItem._id, req.body);
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

exports.updateVendorContract = async (req, res) => {
    try {
        const vendor = await vendorModel.findOne({ _id: req.body.id });
        if (!vendor) {
            return res.status(400).json({ message: 'Vendor not found' });
        }
        vendor.contract.startDate = req.body.startDate;
        vendor.contract.endDate = req.body.endDate;

        await vendorModel.findOneAndUpdate({ _id: vendor._id }, vendor);
        res.status(200).json({ message: 'Successfully updated vendor item' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

