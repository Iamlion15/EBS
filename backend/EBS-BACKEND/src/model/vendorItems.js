const mongoose = require("mongoose")

const vendorItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    properties: [
        {
            title: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            },
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendor"
    }
})

const vendorItemModel = mongoose.model("vendoritem", vendorItemSchema);

module.exports = vendorItemModel;