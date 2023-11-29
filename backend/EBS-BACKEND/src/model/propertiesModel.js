const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    title: {
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