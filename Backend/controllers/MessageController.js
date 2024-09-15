import Message from '../models/Message.js';

// Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a message by ID
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new message
export const createMessage = async (req, res) => {
  const { content, sender, receiver } = req.body;
  try {
    let message = new Message({ content, sender, receiver });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a message by ID
export const updateMessage = async (req, res) => {
  const { content, sender, receiver } = req.body;
  try {
    let message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    message.content = content || message.content;
    message.sender = sender || message.sender;
    message.receiver = receiver || message.receiver;

    await message.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a message by ID
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    await message.remove();
    res.json({ message: 'Message removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
