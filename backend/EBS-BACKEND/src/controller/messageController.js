const userModel = require("../model/userModel")
const MessageModel = require("../model/messageModal")
const ChatModel = require("../model/chatMessageModel")


exports.sendMessage = async (req, res) => {
    try {
        // Find existing chat between sender and receiver
        const senderId = req.user.id;
        const recipientId = req.body.receiver;
        const existingChat = await ChatModel.findOne({
            participants: { $all: [senderId, recipientId] },itemrequest: req.body.itemId,
        });

        if (existingChat) {
            // Chat exists, append message
            const newMessage = new MessageModel({
                content: req.body.content,
                sender: senderId
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
                sender: senderId
            });
            // Save the new message first
            await newMessage.save();
            const newChatMessage = new ChatModel({
                participants: [senderId, recipientId],
                itemrequest: req.body.itemId,
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
        const receiverId = req.body.receiverId;
        const itemRequestId=req.body.itemRequestId

        // Find the chat between the sender and the receiver
        const chat = await ChatModel.findOne({
            participants: { $all: [senderId, receiverId] },
            itemrequest:itemRequestId
        })
            .populate({
                path: 'participants',
                model: 'user',
            })
            .populate({
                path: 'message',
                model: 'message',
                populate: {
                    path: 'sender',
                    model: 'user',
                },
            })
            .exec();

        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
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
                read: conversation.Read,
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


exports.getMessages = async (req, res) => {
    try {
        const senderId = req.user.id;

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
            .populate({
                path: 'message',
                model: 'message',
                populate: {
                    path: 'sender',
                    model: 'user',
                },
            })
            .exec();

        if (!chat) {
            return res.status(404).json({ error: 'No message found' });
        }
        chat.sort((a, b) => {
            // Get the createdAt time of the latest message for each item
            const createdAtA = a.message.length > 0 ? new Date(a.message[a.message.length-1].createdAt) : new Date(a.createdAt);
            const createdAtB = b.message.length > 0 ? new Date(b.message[b.message.length-1].createdAt) : new Date(b.createdAt);      
            // Compare the createdAt times and sort in descending order
            return createdAtB - createdAtA;
        });

        res.status(200).json(chat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.markAsRead = async (req, res) => {
    const messageId = req.params.messageId;
    console.log(messageId);
    try {
        const message = await MessageModel.findByIdAndUpdate(
            messageId,
            {
                'Read.isRead': true,
                'Read.timeOfRead': new Date(),
            },
        );
        res.status(200).json({ message: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
