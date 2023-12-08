const mongoose = require("mongoose")

const invoiceSchema = new mongoose.Schema({
    vendoritem: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendoritem"
    },
    requestedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    financeApprovedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    EBSApprovedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})
const invoiceModel = mongoose.model("invoice", invoiceSchema);

module.exports = invoiceModel;