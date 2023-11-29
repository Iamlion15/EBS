const mongoose = require("mongoose")

const InvoiceSchema = new mongoose.Schema({
    vendor: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
})
const propertyModel = mongoose.model("property", propertySchema);

module.exports = vendorModel;