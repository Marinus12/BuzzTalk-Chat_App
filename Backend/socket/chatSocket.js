import Message from '../models/messageModel.js';

export const handleSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a private or group chat room
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Handle sending messages in a room
    socket.on('sendMessage', async ({ roomId, sender, message }) => {
      // Save the message in the database
      const newMessage = new Message({ roomId, sender, message });
      await newMessage.save();

      // Emit the message to the room
      io.to(roomId).emit('newMessage', newMessage);
      console.log(`Message from ${sender} to room ${roomId}: ${message}`);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
