const mongoose =require("mongoose")

const itemSchema=new mongoose.Schema({
    ItemName:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    whenNeeded:{
        type:Date,
        required:true
    },
    itemType:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        required:true
    },
    fileLocation:{
        type:String,
        required:true
    }
},{timestamps:true})


const itemModel=mongoose.model("item",itemSchema)

module.exports=itemModel;