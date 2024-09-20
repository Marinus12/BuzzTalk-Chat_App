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
    //await Conversation.save();
    //await newMessage.save();

    //this will run in parallel
    await Promise.all([Conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage);

} catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({error:"internal server error"});

}
};

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId}= req.params;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId] },
        }).populate("message"); // not reference but actual message
        
        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        res.status(200).json(messages);


   
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({error: "internal server error"});

    }
    }

