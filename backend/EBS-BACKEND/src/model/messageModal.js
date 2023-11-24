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
    Read: {
        isRead:{
        type: Boolean,
        default: false,
        },
        timeOfRead:Date

    },
},{timestamps:true});

const messageModel = mongoose.model('message', messageSchema);
module.exports=messageModel;
