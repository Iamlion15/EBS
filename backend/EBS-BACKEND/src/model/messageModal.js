const mongoose=require("mongoose")

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    content:{
        type: String,
        default: false, 
    },
    isRead: {
        type: Boolean,
        default: false,
    },
},{timestamps:true});

const messageModel = mongoose.model('message', messageSchema);
module.exports=messageModel;
