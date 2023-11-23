const userModel = require("../model/userModel")
const MessageModel = require("../model/messageModal")
const ChatModel = require("../model/chatMessageModel")


exports.sendMessage = async (req, res) => {
    try {
        // Find existing chat between sender and receiver
        const senderId = req.user.id;
        const recipientId = req.body.receiver;
        const existingChat =await ChatModel.findOne({
            participants: { $all: [senderId, recipientId] },
        });

        if (existingChat) {
            // Chat exists, append message
            const newMessage = new MessageModel({
                content: req.body.content,
                sender:senderId
            });

            // Save the new message first
            await newMessage.save();

            // Add the saved message to the existing chat
            existingChat.message.push(newMessage);

            // Save the existing chat to update it in the database
            await existingChat.save();
        } else {
            // Chat doesn't exist, create a new one
            const newMessage = new MessageModel({
                content: req.body.content,
                sender:senderId
            });

            // Save the new message first
            await newMessage.save();

            const newChatMessage = new ChatModel({
                participants:[senderId,recipientId],
                itemrequest:req.body.itemId,
                message: [newMessage],
            });

            // Save the new chat to persist it in the database
            await newChatMessage.save();
        }
        res.status(200).json({ message: "Successfully sent message" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ err });
    }
}

exports.getMessagesBetweenUsers = async (req, res) => {
    try {
        const senderId = req.user.id;
        const receiverId = req.body.receiverId; // Assuming you get the receiver ID from the request parameters

        // Find the chat between the sender and the receiver
        const chat = await ChatModel.findOne({
            participants: { $all: [senderId, receiverId] },
        })
        .populate({
            path: 'participants',
            model: 'user',
        })
        .populate({
            path: 'message',
            model: 'message',
            populate: {
                path: 'sender', // Adjust this based on your actual message schema
                model: 'user',
            },
        })
        .exec();

        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        console.log(chat);
        // Extract relevant information for the response
        const formattedChat = {
            chatId: chat._id,
            participants: chat.participants,
            messages: chat.message.map(conversation => ({
                messageId: conversation._id,
                content: conversation.content,
                sender: {
                    userId: conversation.sender._id,
                    firstname: conversation.sender.firstname,
                    lastname: conversation.sender.lastname, 
                    
                },
                timestamp: chat.timestamp,
            })),
            item: chat.item,
        };

        res.status(200).json({ chat: formattedChat });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getMessages=async(req,res)=>{
    try {
        const senderId = req.user.id;
    
        // Find the chat where the sender is involved
        const chat = await ChatModel.find({
            participants: senderId,
        })
        .populate({
            path: 'participants',
            model: 'user',
        })
        .populate({
            path: 'itemrequest',
            model: 'itemrequest',
            populate: [
                {
                    path: 'owner',
                    model: 'user',
                },
                {
                    path: 'item',
                    model: 'item',
                },
            ],
        })
        
        .exec();
    
        if (!chat) {
            return res.status(404).json({ error: "No message found" });
        }
    
    
        res.status(200).json(chat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}    
