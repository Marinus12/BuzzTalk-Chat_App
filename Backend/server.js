import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';  // Include chat routes
import Message from './models/messageModel.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());

// Use the auth routes (for register, login, etc.)
app.use('/api', authRoutes);

// Use chat routes
app.use('/api', chatRoutes);  // Add this line to include chat routes

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Verify the user using JWT token before allowing socket connection
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error('Authentication error'));
    socket.user = decoded;
    next();
  });
});

// Socket.io Event Handling (Enhanced for message broadcasting and chat history)
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.userId} (ID: ${socket.id})`);

  // Join private room
  socket.on('joinPrivateRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.user.userId} joined private room ${roomId}`);
  });

  // Join group room
  socket.on('joinGroupRoom', (groupId) => {
    socket.join(groupId);
    console.log(`User ${socket.user.userId} joined group room ${groupId}`);
  });

  // Private message handling
  socket.on('privateMessage', async ({ roomId, message }) => {
    const newMessage = new Message({
      roomId,
      sender: socket.user.userId,
      message,
      timestamp: new Date(),
    });
    await newMessage.save();
    io.to(roomId).emit('newPrivateMessage', newMessage);
  });

  // Group message handling with broadcast
  socket.on('groupMessage', async ({ groupId, message }) => {
    const newMessage = new Message({
      roomId: groupId,
      sender: socket.user.userId,
      message,
      timestamp: new Date(),
    });
    await newMessage.save();
    io.to(groupId).emit('newGroupMessage', newMessage); // Broadcast to the group
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user.userId}`);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
