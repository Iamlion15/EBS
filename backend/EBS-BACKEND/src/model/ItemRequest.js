const mongoose=require("mongoose")


const itemRequestSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    EBS_Approval:{
        approved:Boolean,
        timeOfApproval:Date
    },
    Finance_Approval:{
        approved:Boolean,
        timeOfApproval:Date
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"item"
    },
    vendoritem:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendoritem"
    },
    reviewer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},{timestamps:true})

const itemRequestModel=mongoose.model("itemrequest",itemRequestSchema)

module.exports=itemRequestModel;