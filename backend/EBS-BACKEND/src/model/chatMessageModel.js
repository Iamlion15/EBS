const mongoose=require("mongoose")

const chatMessageSchema = new mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    message:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
    }]
});

const chatModel = mongoose.model('chat', chatMessageSchema);
module.exports=chatModel;
