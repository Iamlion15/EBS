const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
});


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
    properties: [propertySchema],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendor"
    }
});

const vendorItemModel = mongoose.model("vendoritem", vendorItemSchema);

module.exports = vendorItemModel;
