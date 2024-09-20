import Message from '../models/messageModel.js';

// Fetch chat messages for a specific room
export const getChatMessages = async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Fetch chat rooms for a specific user (optional)
export const getUserRooms = async (req, res) => {
  try {
    const rooms = await Message.distinct('roomId', { sender: req.user.username });
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
