import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
try {
    const {message} = req.body;
    const {id: recieverId} = req.params;
    const senderId = req.user._id;

    let Conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] },
    });

    if(!Conversation) {
       Conversation = await Conversation.create({
        participants: [senderId, recieverId],
       });
    }

    const newMessage = new Message({
        senderId,
        recieverId,
        message,
    });

    if(newMessage) {
        Conversation.messages.push(newMessage._id);
        }
    await Conversation.save();
    await newMessage.save();
        res.status(201).json(newMessage);

} catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({error:"internal server error"});

}
};