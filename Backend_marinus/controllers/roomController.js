import Room from '../models/Room.js';

// Create a new chat room
export const createRoom = async (req, res) => {
  const { name, description, type } = req.body;
  const createdBy = req.user.username;  // Assuming you're using auth middleware to attach user info to the request

  try {
    // Ensure name and type are provided
    if (!name || !type) {
      return res.status(400).json({ message: 'Name and type are required to create a room' });
    }

    // Create new room
    const room = new Room({
      name,
      description,
      type, // public or private
      createdBy,
      createdAt: new Date()
    });

    // Save room to the database
    await room.save();

    res.status(201).json({
      message: 'Room created successfully',
      room
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
