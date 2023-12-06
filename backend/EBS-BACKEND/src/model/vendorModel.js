const mongoose = require("mongoose")

const vendorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contract: {
        startDate: Date,
        endDate: Date,
        fileLocation: String,
        status: {
            type: String,
            default: "ACTIVE",
            Enum: ["ACTIVE", "INACTIVE"]
        }
    }
})
const vendorModel = mongoose.model("vendor", vendorSchema);

module.exports = vendorModel;