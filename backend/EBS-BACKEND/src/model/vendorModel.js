const mongoose=require("mongoose")

const vendorSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },    
})
const vendorModel=mongoose.model("vendor",vendorSchema);

module.exports=vendorModel;